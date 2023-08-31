import styles from './ModalProduct.module.css'
import {ReactComponent as Plus} from "../../assets/Plus.svg";
import React, {ChangeEvent, FC, MouseEventHandler, useState} from "react";
import {TextField, useMediaQuery} from "@mui/material";
import {useAppDispatch} from "../../../hooks";
import {addRow} from "../../redux/tableDataSlice";
import {toggleOpen, switchAction} from "../../redux/snackBarSlice";
import {TypeModal, TypeInputData} from "../../types/MyTypes";


type ModalProps = { data: TypeInputData[] } & TypeModal
export const ModalProduct:FC<ModalProps> = ({modal, setModal, data}) => {

    const dispatch = useAppDispatch()

    type ValueType ={
        name?: string
    }
    const [value, setValue] = useState<ValueType | null>({});
    const [error, setError] = useState<{}>({})
    const [focus, setFocus] = useState<boolean>(false)
    const is720 = useMediaQuery('(min-width:800px)')

    const clickOutside = (e:MouseEvent) => {
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
    const createTableData = (e: React.MouseEvent<HTMLElement>) => {
        debugger
        e.preventDefault();
        if (!value) {
            const errorMessage = data.map(item => {
                const container:{name?: string} = {};
                container[item.name as keyof typeof container] = 'Заполните поле!';
                return container;
            })
            const finalErrors = Object.assign({}, ...errorMessage );
            setError(finalErrors);
            setFocus(true)
        } else {
            const filtered = data?.filter((el) => !value[`${el?.name}` as keyof typeof value]);
            const errorMessage = filtered.map(item => {
                const container:{name?: string} = {};
                container[item.name as keyof typeof container] = 'Заполните поле!';
                return container;
            })
            const finalErrors = Object.assign({}, ...errorMessage );
            setError(finalErrors);
            setFocus(true)
            if (Object.keys(finalErrors).length === 0) {
                dispatch(switchAction('create'))
                dispatch(addRow(value));
                setFocus(false);
                setModal(!modal);
                setValue(null);
                dispatch(toggleOpen())
            }
        }
    }

     const onChange = (e: ChangeEvent<HTMLInputElement>) => {
         setValue({...value, [e.target.name]: e.target.value});
    }

    const number = 'number';
    const text = 'text'
    return (
        <div onClick={()=>clickOutside} className={modal ? styles.containerWrapper : styles.container}>
            <form id='123' className={styles.content}>
                <a onClick={clickXMark} className={styles.close}></a>
                <h1 className={styles.h1}>Creating a product</h1>
                {
                    // eslint-disable-next-line react/prop-types
                    data.map((el) => (
                        <div key={el.key} className={styles.inputDiv} >
                            <TextField
                                error={focus && (Boolean(!value?.[el?.name as keyof typeof value])
                                    || (+value?.[el?.name as keyof typeof value]! < 1))}
                                helperText={focus && !value?.[el?.name as keyof typeof value] ? 'заполните это поле' :
                                    focus && (+value?.[el?.name as keyof typeof value]! < 1) ? 'нельзя так' : '' }
                                className={styles.input}
                                variant='outlined'
                                margin={ is720 ? 'normal' : 'none'}
                                type={el?.name === 'price' ?
                                    number : el?.name === 'remains' ?
                                        number : el?.name ==='weight' ?
                                            number : text }
                                value={value?.[el?.name as keyof typeof value] ? value[el?.name as keyof typeof value] : ''}
                                name={el?.name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                                label={el.placeholder}
                                size={is720 ? 'medium' : 'small'}
                            />

                        </div>
                    ))
                }
                <button className={styles.submit} onClick={(e:React.MouseEvent<HTMLElement>) => createTableData(e)}>
                    Add Product<Plus style={{marginLeft: '16px'}} />
                </button>
            </form>
        </div>
    )
}