import styles from './EditModal.module.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editRow, } from "../../app/tableDataSlice.js";
import {TextField} from "@mui/material";


export const EditModal = ({ show, setshow, input}) => {
    const dataEdit = useSelector((state) => state.tableData.dataEdit);
    const dispatch = useDispatch();
    const[value, setValue] = useState(null);
    const clickXMark = () => {
        setshow(!show)
    }
    const updateState = () => {
        dispatch(editRow(value))
    };
    const savingChanges = (e) => {
        if(+value.remains >0 && +value.price >0 && +value.weight>0){
            e.preventDefault();
            updateState();
            setshow(!show)
        }
    }
    useEffect(() => {
        if (dataEdit) {
            setValue({...dataEdit});
        }
    }, [dataEdit])
     const onChange = (e) => {
        setValue(dataEdit);
        setValue({...value, [e.target.name]: e.target.value});
    }
    const clickOutside = (e) => {
        if(e.target === e.currentTarget) {
            setshow(!show)
        }
    }
    return (
        <div onClick={clickOutside} className={show ? styles.containerWrapper : styles.container}>
            <form id='123' className={styles.content}>
                <a onClick={clickXMark} className={styles.close}></a>
                <h1 className={styles.h1}>Editing a product</h1>
                {
                    input.map((el, index) => (
                        <TextField
                            className={styles.input}
                            key={index}
                            type="text"
                            margin='normal'
                            name={el?.name}
                            onChange={(e) => onChange(e)}
                            defaultValue={dataEdit ? dataEdit[el?.name] : ''}
                            label={el.placeholder}
                        />
                    ))
                }
                <div className={styles.submit} onClick={(e) => savingChanges(e)}>
                    Save changes
                </div>
            </form>
        </div>
    )
}