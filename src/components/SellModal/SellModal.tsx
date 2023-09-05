import styles from './SellModal.module.css'
import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {TextField, useMediaQuery} from "@mui/material";
import {sellItem} from '../../redux/tableDataSlice'
import {toggleOpen, switchAction} from "../../redux/snackBarSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {IsellValue} from "../../types/MyTypes";
interface ISellModalProps extends IsellValue{
    show?: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}
export const SellModal: FC<ISellModalProps> = ({ sellValue, setSellValue, show, setShow}) => {
    const dataEdit = useAppSelector((state) => state.tableData.dataEdit)
    const dispatch = useAppDispatch();
    const [remainsFocus, setRemainsFocus] = useState<boolean>(false);
    const [lastSaleFocus, setLastSaleFocus] = useState<boolean>(false);
    const [zeroValue1, setZeroValue1] = useState<string>('')
    const [zeroValue2, setZeroValue2] = useState<string>('')
    const [errorRemains, setErrorRemains] = useState<string>('')
    const [errorLastSale, setErrorLastSale] = useState<string>('')
    const is720 = useMediaQuery('(min-width:800px)')

    const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        switch (e.target.name) {
            case 'remains':
                setRemainsFocus(true)
                break
            case 'lastSale':
                setLastSaleFocus(true)
                break
        }
    }

    const clickXMark = () => {
        setSellValue(null)
        setZeroValue1("")
        setZeroValue2("")
        setErrorRemains("")
        setErrorLastSale("")
        setShow(!show)
    }
    const fixDataValue = (d:string) => {
        const year = d?.slice(0,4)
        const month = d?.slice(5,7)
        const day = d?.slice(8,10)
        return `${day}.${month}.${year}`
    }

    const sellProduct = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if(!sellValue?.hasOwnProperty('remains')){
            setZeroValue1('введите количество товаров')
        }
        if(!sellValue?.hasOwnProperty('lastSale')){
            setZeroValue2('введите дату')
        }
        if(!zeroValue1 &&
            !zeroValue2 &&
            !errorRemains &&
            !errorLastSale &&
            sellValue &&
            sellValue.hasOwnProperty('remains') &&
            sellValue.hasOwnProperty('lastSale')
        ){
            dispatch(sellItem(sellValue))
            setSellValue(null)
            setZeroValue1("")
            setZeroValue2("")
            setErrorRemains("")
            setErrorLastSale("")
            setShow(!show);
            dispatch(switchAction('sell'))
            dispatch(toggleOpen())}
    }

    const onChangeRemains = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSellValue({...sellValue, [e.target.name]: e.target.value});
        if(!e.target.value || e.target.value.length < 1){
            setZeroValue1('введите количество товара')
        } else {
            setZeroValue1('')
        }
        if(+e.target.value > +dataEdit.remains!){
            setErrorRemains('у вас нет столько товаров')
        } else if (+e.target.value < 1){
            setErrorRemains('так нельзя')
        } else {
            setErrorRemains('')
        }
    }
    useEffect(() => {
        dateValidation(dataEdit?.creationDate, sellValue?.lastSale as string);
    },[sellValue?.lastSale, dataEdit?.creationDate])
    const dateValidation = (createDate: string | undefined, saleDate: string | undefined) =>{
        const dateIntegrator = (d:string):number => {
            const y = +d?.slice(6)
            const m = +d?.slice(3,5) * 0.1
            const day = +d?.slice(0,2) * 0.001
            return y + m + day
        }
        if(dateIntegrator(fixDataValue(saleDate!)) > dateIntegrator(createDate!)
            || dateIntegrator(fixDataValue(saleDate!)) === dateIntegrator(createDate!)){
            setErrorLastSale('')
        } else {
            setErrorLastSale('Вы не можете продать товар раньше его создания');
            if(!dateIntegrator(fixDataValue(saleDate!))){
                setErrorLastSale("")
            }
        }
    }
    const onChangeLastSale = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSellValue({...sellValue, [e.target.name]: e.target.value});
        if(!e.target.value){
            setZeroValue2('введите дату')
        } else {
            setZeroValue2('')
        }
    }
    const clickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget){
            setSellValue(null)
            setZeroValue1("")
            setZeroValue2("")
            setErrorRemains("")
            setErrorLastSale("")
            setShow(!show)
        }
    }
    return (
        <div onClick={clickOutside} className={show ? styles.containerWrapper : styles.container}>
            <form id='123' className={styles.content}>
                <a onClick={clickXMark} className={styles.close}></a>
                <h1 className={styles.h1}>Sell the product</h1>
                <div className={styles.text_field}>
                    <TextField
                        className={styles.input}
                        type="number"
                        error={Boolean(zeroValue1) || Boolean(errorRemains)}
                        helperText={zeroValue1 || errorRemains}
                        variant='outlined'
                        name='remains'
                        label='Number of products'
                        margin={is720 ? 'normal' : 'none'}
                        size={is720 ? 'medium' : 'small'}
                        value={sellValue && sellValue?.remains ? sellValue?.remains : ''}
                        onChange={(e) => onChangeRemains(e)}
                        onBlur={()=> blurHandler}
                    />
                </div>
                <div className={styles.text_field}>
                    <TextField
                        className={styles.input}
                        type={lastSaleFocus ? 'date' : 'text'}
                        error={Boolean(zeroValue2) || Boolean(errorLastSale)}
                        helperText={zeroValue2 || errorLastSale}
                        variant='outlined'
                        name="lastSale"
                        margin={is720 ? 'normal' : 'none'}
                        size={is720 ? 'medium' : 'small'}
                        value={sellValue &&  sellValue?.lastSale ? sellValue?.lastSale : ''}
                        label='Date of sale'
                        onFocus={(e)=>blurHandler(e)}
                        onChange={(e)=> onChangeLastSale(e)}
                        onBlur={() => setLastSaleFocus(false)}
                    />
                </div>
                <div className={styles.submit} onClick={(e) => sellProduct(e)}>
                    Sell product
                </div>
            </form>
        </div>
    )
}