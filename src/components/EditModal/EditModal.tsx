import styles from './EditModal.module.css'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editRow, } from "../../redux/tableDataSlice";
import {TextField, useMediaQuery} from "@mui/material";
import {toggleOpen, switchAction} from "../../redux/snackBarSlice";


export const EditModal = ({value, setValue, show, setshow, input}) => {
    const dataEdit = useSelector((state) => state.tableData.dataEdit);
    const dispatch = useDispatch();
    const is720 = useMediaQuery('(min-width:800px)')

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
            dispatch(switchAction('editProd'))
            dispatch(toggleOpen())

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
                            size={ is720 ? "medium" : 'small' }
                            name={el?.name}
                            onChange={(e) => onChange(e)}
                            label={el.placeholder}
                            value={value ? value[el.name] : ''}
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