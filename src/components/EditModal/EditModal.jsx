import styles from './EditModal.module.css'
import {useEffect, useState} from "react";

export const EditModal = ({dataEdit, show, setshow, input, tableData, setTableData}) => {

    const[value, setValue] = useState(null);
    const clickXMark = () => {
        setshow(!show)
    }
    const updateState = () => {
        const newState = tableData.map(item => {
            if (item.key === dataEdit.key) {
                return {...value}
            }
            return item;
        });
        setTableData(newState);
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
                            onChange={onChange}
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