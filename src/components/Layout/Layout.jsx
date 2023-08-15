import styles from './Layout.module.css'
import {ReactComponent as Logo} from "../../assets/Logo.svg";
import {ReactComponent as Home} from "../../assets/Home.svg";
import {ReactComponent as Doc} from "../../assets/Doc.svg";
import {ReactComponent as Percent} from "../../assets/Percent.svg";
import {ReactComponent as User} from "../../assets/User.svg";
import {ReactComponent as Logout} from "../../assets/Logout.svg";
import {ReactComponent as Create} from "../../assets/Create.svg";
import {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ModalProduct} from "../ModalProduct/ModalProduct.jsx";
import {useSelector, useDispatch} from "react-redux";
import {toggleAuth} from "../../app/authSlice.js";


const linksArray = [
    {
        name: 'Main Page',
        img: <Home  className={styles.svg}/>,
        id: 0,
        link: '/'
    },
    {
        name: 'My Products',
        img: <Doc className={styles.svg}/>,
        id: 1,
        link: '/products'
    },
    {
        name: 'My sales',
        img: <Percent className={styles.svg}/>,
        id: 2,
        link: '/sales'
    },
    {
        name: 'Personal Cabinet',
        img: <User className={styles.svg}/>,
        id: 3,
        link: '/cabinet'
    }]
// eslint-disable-next-line react/prop-types
export const Layout = ({  modal, setModal, data}) => {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const history = useLocation();
    const [active, setActive] = useState(history.pathname)
    const[errors, setErrors] = useState("")
    const navigate = useNavigate();
    const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;

    useEffect(() => {
        if(reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }, []);
    const titles = (linkName) => {
        switch (linkName) {
            case '/':
                return{title:'Sales statistic',
                    subtitle: 'Welcome to CRM dashboard'}
            case '/products':
                return{title:'My products',
                    subtitle: 'Product table'}
            case '/cabinet':
                return{title:'Personal Cabinet',
                    subtitle: 'Information about your account'}
            case '/sales':
                return{title:'My sales',
                    subtitle: 'Sales table'}
        }
    }
    const logout = () => {
        console.log('click logout')
        localStorage.removeItem("tableData")
        localStorage.removeItem("sellData")
        localStorage.removeItem("userID")
        dispatch(toggleAuth(auth))
    }
    const onClick = (link) =>{
        setActive(link);
    };
    const click = () => {
        setModal(!modal)
    }
    return (
        <div className={styles.container}>
            <aside className={styles.aside}>
                <div className={styles.logoBox}>
                    <Logo/>
                </div>
                <div className={styles.linkBox}>
                    <div className={styles.toplink}>
                        {linksArray?.map((el) => (
                                <div
                                    key={el?.id}
                                    className={
                                        active === el?.link
                                            ? styles.link_
                                            : styles.link
                                    }
                                    onClick={() => {
                                        onClick(el?.link)
                                        navigate(el?.link)
                                    }}
                                >
                                    {el?.img}
                                    {el?.name}
                                </div>
                            ))}
                    </div>
                    <div className={styles.linkBox_}>
                        <hr/>
                        <div className={styles.link}
                             onClick={() =>  logout()}>
                            <Logout className={styles.svg}/>Log out
                        </div>
                    </div>
                </div>
            </aside>
            <div>
                <header className={styles.header}>
                    <div>
                        {/* eslint-disable-next-line react/prop-types */}
                        <h1 className={styles.h1}>{titles(history.pathname)?.title}</h1>
                        {/* eslint-disable-next-line react/prop-types */}
                        <h5 className={styles.h5}>{titles(history.pathname)?.subtitle}</h5>
                    </div>
                    <button className={styles.button} onClick={click}><Create className={styles.svg}/> Create a product</button>
                </header>
                <hr style={{marginBottom: '40px'}}/>
                <ModalProduct
                    errors={errors}
                    setErrors={setErrors}
                    modal={modal}
                    setModal={setModal}
                    data={data}
                />
                { <Outlet />}

            </div>
        </div>
    )
}