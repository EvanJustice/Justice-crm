import styles from './SellModal.module.css'
import {useEffect, useState} from "react";
import {TextField} from "@mui/material";

export const SellModal = ({dataEdit, sellValue, setSellValue, show, setShow, setTableData, tableData, setSellData, sellData}) => {

    const [remainsFocus, setRemainsFocus] = useState(false);
    const [lastSaleFocus, setLastSaleFocus] = useState(false);
    const [zeroValue1, setZeroValue1] = useState('')
    const [zeroValue2, setZeroValue2] = useState('')
    const [errorRemains, setErrorRemains] = useState('')
    const [errorLastSale, setErrorLastSale] = useState('')

    const blurHandler = (e) => {
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
    const fixDataValue = (d) => {
        const year = d?.slice(0,4)
        const month = d?.slice(5,7)
        const day = d?.slice(8,10)
        return `${day}.${month}.${year}`
    }

    const sellProduct = (e) => {
        const updateState = () => {
            const tableFix = tableData?.map(item => {
                if (item?.key === dataEdit?.key) {
                    return {
                        ...dataEdit,
                        remains: `${+dataEdit?.remains - sellValue?.remains}`,
                        lastSale: fixDataValue(sellValue?.lastSale)}
                }
                return item;
            });
            const zeroFilter = tableFix.filter((e)=> (+e.remains > 0))
            const hasSellItem = sellData?.filter((el) => el?.key === dataEdit?.key);
            const tableSellFix = sellData?.map(item => {
                if (item?.key === dataEdit?.key) {
                    return {
                        ...dataEdit,
                        remains: Number(item?.remains) + Number(sellValue?.remains),
                        lastSale: fixDataValue(sellValue?.lastSale)}
                }
                return item;
            });
            setTableData(zeroFilter.length ? tableFix : zeroFilter);
            setSellData(hasSellItem?.length > 0
                ? tableSellFix
                : [{
                    ...dataEdit,
                    remains: `${sellValue.remains}`,
                    lastSale: fixDataValue(sellValue?.lastSale)
                },
                    ...sellData
                ])}
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
            updateState();
            setSellValue(null)
            setZeroValue1("")
            setZeroValue2("")
            setErrorRemains("")
            setErrorLastSale("")
            setShow(!show);}
    }

    const onChangeRemains = (e) => {
        setSellValue({...sellValue, [e.target.name]: e.target.value});
        if(!e.target.value || e.target.value.length < 1){
            setZeroValue1('введите количество товара')
        } else {
            setZeroValue1('')
        }
        if(+e.target.value > +dataEdit.remains){
            setErrorRemains('у вас нет столько товаров')
        } else {
            setErrorRemains('')
        }
    }
    useEffect(() => {
        dateValidation(dataEdit?.creationDate, sellValue?.lastSale);
    },[sellValue?.lastSale, dataEdit?.creationDate])
    const dateValidation = (createDate, saleDate) =>{
        const dateIntegrator = (d) => {
            const y = +d?.slice(6)
            const m = +d?.slice(3,5) * 0.1
            const day = +d?.slice(0,2) * 0.001
            return y + m + day
        }
        if(dateIntegrator(fixDataValue(saleDate)) > dateIntegrator(createDate)
            || dateIntegrator(fixDataValue(saleDate)) === dateIntegrator(createDate)){
            setErrorLastSale('')
        } else {
            setErrorLastSale('Вы не можете продать товар раньше его создания');
            if(!dateIntegrator(fixDataValue(saleDate))){
                setErrorLastSale("")
            }
        }
    }
    const onChangeLastSale = (e) => {
        setSellValue({...sellValue, [e.target.name]: e.target.value});
        if(!e.target.value){
            setZeroValue2('введите дату')
        } else {
            setZeroValue2('')
        }
    }
    const clickOutside = (e) => {
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
                        error={zeroValue1 || errorRemains}
                        helperText={zeroValue1 || errorRemains}
                        variant='outlined'
                        name='remains'
                        label='Number of products'
                        margin='normal'
                        value={sellValue && sellValue?.remains ? sellValue?.remains : ''}
                        onChange={(e) => onChangeRemains(e)}
                        onBlur={blurHandler}
                    />
                </div>
                <div className={styles.text_field}>
                    <TextField
                        className={styles.input}
                        type={lastSaleFocus ? 'date' : 'text'}
                        error={zeroValue2 || errorLastSale}
                        helperText={zeroValue2 || errorLastSale}
                        variant='outlined'
                        name="lastSale"
                        margin='normal'
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