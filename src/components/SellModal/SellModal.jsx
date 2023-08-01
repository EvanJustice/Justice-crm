import styles from './SellModal.module.css'
import {useEffect, useState} from "react";

export const SellModal = ({dataEdit, sellValue, setSellValue, show, setShow, setTableData, tableData, setSellData, sellData}) => {

    const [remainsFocus, setRemainsFocus] = useState(false);
    const [remainsErrors, setRemainsErrors] = useState("");
    const [lastSaleFocus, setLastSaleFocus] = useState(false);
    const [lastSaleErrors, setLastSaleErrors] = useState("");

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'remains':
                setRemainsFocus(true)
                break
            case 'lastSale':
                e.target.type = "text"
                setLastSaleFocus(true)
                break
        }
    }

    const clickXMark = () => {
        setSellValue(null)
        setShow(!show)
    }
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

    const sellProduct = (e) => {
        e.preventDefault();
        dataLenght();
        remLenght();
        if(!remainsErrors && !lastSaleErrors && dataLenght() && remLenght()){
            updateState();
            setShow(!show);
            setSellValue(null)
        }
    }
    const dataLenght = () => {
        Boolean(!sellValue?.lastSale) ? setLastSaleErrors('дату!!!') : setLastSaleErrors('')
    }
    const remLenght = () => {
        Boolean(!sellValue?.remains) ? setRemainsErrors('товар!!!') : setRemainsErrors('')
    }
    const onChangeRemains = (e) => {
        setSellValue({...sellValue, [e.target.name]: e.target.value});
        if(e.target.name === 'remains' && +e.target.value > +dataEdit.remains){
            setRemainsErrors('У вас нет столько вещей')
        } else {
            setRemainsErrors('')
        }
    }
    const onChangeLastSale = (e) => {
        setSellValue({...sellValue, [e.target.name]: e.target.value});
        dateValidation(dateIntegrator(dataEdit.creationDate),
            dateIntegrator(fixDataValue(sellValue.lastSale)))
        }
    const fixDataValue = (d) => {
        const year = d?.slice(0,4)
        const month = d?.slice(5,7)
        const day = d?.slice(8,10)
        return `${day}.${month}.${year}`
    }
    const dateIntegrator = (d) => {
        const y = +d?.slice(6)
        const m = +d?.slice(3,5) * 0.1
        const day = +d?.slice(0,2) * 0.001
        return y + m + day
    }
    const dateValidation = (createDate, saleDate) =>{
        if(saleDate > createDate || saleDate === createDate){
            setLastSaleErrors('')
            return true
        } else {
            setLastSaleErrors('Вы не можете продать товар раньше его создания')
            return false
        }
    }
    const clickOutside = (e) => {
        if(e.target === e.currentTarget){
            setShow(!show)
            setSellValue(null)
        } else {
            console.log(Boolean(sellValue?.lastSale))}
    }
    return (
        <div onClick={clickOutside} className={show ? styles.containerWrapper : styles.container}>
            <form id='123' className={styles.content}>
                <a onClick={clickXMark} className={styles.close}></a>
                <h1 className={styles.h1}>Sell the product</h1>
                {
                    (remainsErrors && remainsFocus) &&
                    <span style={{color: "red"}}>{remainsErrors}</span>
                }
                        <input
                            className={styles.input}
                            type="number"
                            name='remains'
                            placeholder='Number of products'
                            value={sellValue && sellValue?.remains ? sellValue?.remains : ''}
                            onChange={(e) => onChangeRemains(e)}
                            onBlur={blurHandler}
                        />
                {
                    <span style={{color: "red"}}>{lastSaleErrors}</span>
                }
                        <input
                                    className={styles.input}
                                    type="text"
                                    name="lastSale"
                                    value={sellValue &&  sellValue?.lastSale ? sellValue?.lastSale : ''}
                                    placeholder='Date of sale'
                                    onChange={(e)=> onChangeLastSale(e)}
                                    onBlur={(e) => blurHandler(e)}
                                    onFocus={(e) => (e.target.type = "date")}
                        />
                <div className={styles.submit} onClick={(e) => sellProduct(e)}>
                    Sell product
                </div>
            </form>
        </div>
    )
}