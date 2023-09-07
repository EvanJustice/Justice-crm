import styles from './EditModal.module.css'
import React, {Dispatch, FC, SetStateAction, useEffect} from "react";
import {editRow} from "../../redux/tableDataSlice";
import {TextField, useMediaQuery} from "@mui/material";
import {toggleOpen, switchAction} from "../../redux/snackBarSlice";
import {InputDataType, TableDataType} from "../../types/MyTypes";
import {useAppDispatch, useAppSelector} from "../../../hooks";

interface IEditModalProps {
    value: TableDataType
    setValue: Dispatch<SetStateAction<TableDataType>>
    show: boolean
    setshow: Dispatch<SetStateAction<boolean>>
    input: InputDataType & TableDataType & TableDataType[]
}
export const EditModal: FC<IEditModalProps> = ({value, setValue, show, setshow, input}) => {
    const dataEdit = useAppSelector((state) => state.tableData.dataEdit);
    const dispatch = useAppDispatch();
    const is720: boolean = useMediaQuery('(min-width:800px)')

    const clickXMark = () => {
        setshow(!show)
    }
    const updateState = () => {
        dispatch(editRow(value))
    };
    const savingChanges = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(value.remains && value.price && value.weight ){
            if(+value.remains > 0 && +value.price > 0 && +value.weight > 0){
                e.preventDefault();
                updateState();
                setshow(!show)
                dispatch(switchAction('editProd'))
                dispatch(toggleOpen())
            }
        }
    }

    useEffect(() => {
        if (dataEdit) {
            setValue({...dataEdit});
        }
    }, [dataEdit])
     const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(dataEdit);
        setValue({...value, [e.target.name]: e.target.value});
    }
    const clickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
                            value={value ? value[el.name as keyof typeof value] : ''}
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