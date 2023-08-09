import styles from './EditModal.module.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../app/tableDataSlice.js";


export const EditModal = ({ show, setshow, input}) => {
    const dataEdit = useSelector((state) => state.dataEdit);
    const dispatch = useDispatch();


    const[value, setValue] = useState(null);
    console.log(value)
    const clickXMark = () => {
        setshow(!show)
    }
    const updateState = () => {
        dispatch(actions.editRow(value))
    };
    const savingChanges = (e) => {
        e.preventDefault();
        updateState();
        setshow(!show)
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
                        <input
                            className={styles.input}
                            key={index}
                            type="text"
                            name={el?.name}
                            onChange={(e) => onChange(e)}
                            defaultValue={dataEdit ? dataEdit[el?.name] : ''}
                            placeholder={el.name}
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