import styles from "./Layout.module.css"
import {ReactComponent as Logo} from "../../assets/Logo.svg";
import {ReactComponent as Home} from "../../assets/Home.svg";
import {ReactComponent as Doc} from "../../assets/Doc.svg";
import {ReactComponent as Percent} from "../../assets/Percent.svg";
import {ReactComponent as User} from "../../assets/User.svg";
import {ReactComponent as Logout} from "../../assets/Logout.svg";
import {ReactComponent as Create} from "../../assets/Create.svg";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ModalProduct} from "../ModalProduct/ModalProduct.js";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {toggleAuth} from "../../redux/authSlice.js";
import {SnackBar} from "../SnackBar/SnackBar.js";


type LinksArray = {
    name: string
    img: React.JSX.Element
    id: number
    link: string
}[]
const linksArray:LinksArray = [
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
type LayoutProps = {
    modal: boolean
    setModal: Dispatch<SetStateAction<boolean>>
    data: {
        key: number
        placeholder: string
        value: string
        name: string
        focus: boolean
}[]
}
export const Layout: FC<LayoutProps> = ({modal, setModal, data}) => {

    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    ///???
    const history = useLocation();
    const navigate = useNavigate();

    const [burgerActive, setBurgerActive] = useState<boolean>(false)
    const [active, setActive] = useState<string>(history.pathname)
    const reloadCount: number = Number(sessionStorage.getItem('reloadCount')) || 0;

    useEffect(():void => {
        if(reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }, []);
    type TitleReturnType = {
        subtitle: string
        title: string
    }
    const titles = (linkName:string): TitleReturnType | undefined  => {
        if(linkName)
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

    const logout = ():void => {
        console.log('click logout')
        localStorage.removeItem("tableData")
        localStorage.removeItem("sellData")
        localStorage.removeItem("userID")
        dispatch(toggleAuth(auth))
    }
    const onClick = (link: string): void =>{
        setActive(link);
        setBurgerActive(false)
    };
    const click = ():void => {
        setModal(!modal)
    }
    return (
        <div className={styles.container}>
            <aside className={ burgerActive ? styles.asideActive_ : styles.aside}>
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
                        <button className={burgerActive ? styles.button_new : styles.d_none} onClick={click}><Create className={styles.createSvg}/>
                            <span className={styles.buttonSpan}>
                                Create a product
                            </span>
                        </button>
                    </div>

                    <div className={styles.linkBox_}>
                        <hr/>
                        <div className={styles.link}
                             onClick={() =>  logout()}>
                            <Logout className={styles.svg}/>
                            Log out
                        </div>
                    </div>
                </div>
            </aside>
            <div>
                <button onClick={() => setBurgerActive(!burgerActive)}
                        className={burgerActive ? styles.burger_btnActive : styles.burger_btn}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <header className={styles.header}>
                    <div className={styles.titleButton}>
                        <div className={styles.title}>
                            {/* eslint-disable-next-line react/prop-types */}
                            <h1 className={styles.h1}>{titles(history.pathname)?.title}</h1>
                            {/* eslint-disable-next-line react/prop-types */}
                            <h5 className={styles.h5}>{titles(history.pathname)?.subtitle}</h5>
                        </div>
                        <SnackBar/>
                        <button className={styles.button} onClick={click}><Create className={styles.createSvg}/>
                            <span className={styles.buttonSpan}>
                                Create a product
                            </span>
                        </button>
                    </div>
                    <hr className={history.pathname === '/products' ? styles.hr_prod : styles.hr}/>
                </header>
                <ModalProduct
                    modal={modal}
                    setModal={setModal}
                    data={data}
                />
                <Outlet />
            </div>
        </div>
    )
}