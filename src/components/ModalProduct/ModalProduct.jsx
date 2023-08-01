import styles from './ModalProduct.module.css'
import {ReactComponent as Plus} from "../../assets/Plus.svg";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const ModalProduct = ({modal, setModal, data, tableData, setTableData}) => {

    const[value, setValue] = useState(null);
    const [error, setError] = useState('')
    const dateCorrector = (a) => {
        if(a<10){
            return '0' + a
        } else {
            return a
        }
    }

    const productDate = (t = new Date()) => {
        const y = t.getFullYear();
        const m = dateCorrector(t.getMonth() + 1);
        const d = dateCorrector(t.getDate())
        return `${d}.${m}.${y}`
    }
    const clickOutside = (e) => {
        if(e.target === e.currentTarget){
            setModal(!modal)
            setValue(null);
        }
        // else {console.log(productDate())}
    }
    const clickXMark = () => {
        setModal(!modal)
        setValue(null);
    }
    const createTableData = (e) => {
        e.preventDefault();
        if (!value) {
            const errorMessage = data.map(item => {
                const container = {};
                container[item.name] = 'Заполните поле!';
                return container;
            })
            const finalErrors = Object.assign({}, ...errorMessage );
            setError(finalErrors);
        } else {
            const filtered = data?.filter((el) => !value[`${el?.name}`]);
            const errorMessage = filtered.map(item => {
                const container = {};
                container[item.name] = 'Заполните поле!';
                return container;
            })
            const finalErrors = Object.assign({}, ...errorMessage );
            setError(finalErrors);

            if (Object.keys(finalErrors).length === 0) {
                setTableData([
                    {
                        ...value,
                        key: (new Date).getTime(),
                        address: 'Krylatskaya street',
                        creationDate: productDate()
                    },
                    ...tableData]
                );
                setModal(!modal)
                setValue(null);
            }
        }
    }

     const onChange = (e) => {
         setValue({...value, [e.target.name]: e.target.value} );
    }


    const number = 'number';
    const text = 'text'
    return (
        <div onClick={clickOutside} className={modal ? styles.containerWrapper : styles.container}>
            <form id='123' className={styles.content}>
                <a onClick={clickXMark} className={styles.close}></a>
                <h1 className={styles.h1}>Creating a product</h1>
                {
                    // eslint-disable-next-line react/prop-types
                    data.map((el) => (
                        <div key={el.key}>
                            <span style={{color: 'red'}}>{error[el?.name]}</span>
                            <input
                                className={styles.input}
                                type={el?.name === 'price' ?
                                    number : el?.name === 'remains' ?
                                        number : el?.name ==='weight' ?
                                            number : text }

                                value={value?.[el?.name] ? value[el?.name] : ''}
                                name={el?.name}
                                onChange={onChange}
                                placeholder={el.placeholder}/>
                        </div>
                    ))
                }
                <button className={styles.submit} onClick={(e) => createTableData(e)}>
                    Add Product<Plus style={{marginLeft: '16px'}} />
                </button>
                <span></span>
            </form>
        </div>
    )
}