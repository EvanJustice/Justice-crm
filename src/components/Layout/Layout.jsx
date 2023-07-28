import styles from './Layout.module.css'
import {ReactComponent as Logo} from "../../assets/Logo.svg";
import {ReactComponent as Home} from "../../assets/Home.svg";
import {ReactComponent as Doc} from "../../assets/Doc.svg";
import {ReactComponent as Percent} from "../../assets/Percent.svg";
import {ReactComponent as User} from "../../assets/User.svg";
import {ReactComponent as Logout} from "../../assets/Logout.svg";
import {ReactComponent as Create} from "../../assets/Create.svg";
import {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ModalProduct} from "../ModalProduct/ModalProduct.jsx";


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
export const Layout = ({tableData, setTableData, modal, setModal, data}) => {
    const [active, setActive] = useState(null)
    const[errors, setErrors] = useState("")
    const navigate = useNavigate();
    const history = useLocation();
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

    const onClick = (id) =>{
        setActive(id);
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
                                        active === el?.id
                                            ? styles.link_
                                            : styles.link
                                    }
                                    onClick={() => {
                                        onClick(el?.id)
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
                        <div className={styles.link} >
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
                    tableData={tableData}
                    setTableData={setTableData}
                    modal={modal}
                    setModal={setModal}
                    data={data}
                />
                <Outlet />
            </div>
        </div>
    )
}