import styles from './ModalProduct.module.css'
import {ReactComponent as Plus} from "../../assets/Plus.svg";
import { useState } from "react";
import {TextField} from "@mui/material";
import { useDispatch } from "react-redux";
import {addRow} from "../../app/tableDataSlice.js";
import {toggleOpen} from "../../app/snackBarSlice.js";


// eslint-disable-next-line react/prop-types
export const ModalProduct = ({modal, setModal, data}) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState({});
    const [error, setError] = useState({})
    const [focus, setFocus] = useState(false)

    const clickOutside = (e) => {
        if(e.target === e.currentTarget){
            setFocus(false)
            setModal(!modal)
            setValue(null);
        }
    }
    const clickXMark = () => {
        setModal(!modal)
        setFocus(false)
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
            setFocus(true)
        } else {
            const filtered = data?.filter((el) => !value[`${el?.name}`]);
            const errorMessage = filtered.map(item => {
                const container = {};
                container[item.name] = 'Заполните поле!';
                return container;
            })
            const finalErrors = Object.assign({}, ...errorMessage );
            setError(finalErrors);
            setFocus(true)
            if (Object.keys(finalErrors).length === 0) {
                dispatch(addRow(value));
                setFocus(false);
                dispatch(toggleOpen())
                setModal(!modal);
                setValue(null);
            }
        }
    }

     const onChange = (e) => {
         setValue({...value, [e.target.name]: e.target.value});
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
                        <div key={el.key} className={styles.inputDiv} >
                            <TextField
                                error={focus && (Boolean(!value?.[el?.name]) || (+value?.[el?.name] < 1))}
                                helperText={focus && !value?.[el?.name] ? 'заполните это поле' : focus && (+value?.[el?.name] < 1) ? 'нельзя так' : '' }
                                className={styles.input}
                                variant='outlined'
                                margin='normal'
                                type={el?.name === 'price' ?
                                    number : el?.name === 'remains' ?
                                        number : el?.name ==='weight' ?
                                            number : text }
                                value={value?.[el?.name] ? value[el?.name] : ''}
                                name={el?.name}
                                onBlur={(e) => e.target.value ?
                                    setFocus(false) : setFocus(true)}
                                onChange={(e) => onChange(e)}
                                label={el.placeholder}/>
                        </div>
                    ))
                }
                <button className={styles.submit} onClick={(e) => createTableData(e)}>
                    Add Product<Plus style={{marginLeft: '16px'}} />
                </button>
            </form>
        </div>
    )
}