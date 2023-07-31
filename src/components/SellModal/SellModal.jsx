import styles from './SellModal.module.css'
import {useState} from "react";

export const SellModal = ({dataEdit, sellValue, setSellValue, show, setShow, setTableData, tableData, setSellData, sellData}) => {

    const [errors, setErrors] = useState({
        remainsValue: '',
        lastSaleValue: ''
    })
    const clickXMark = () => {
        setShow(!show)
    }
    const updateState = () => {
        const tableFix = tableData?.map(item => {
                if (item?.key === dataEdit?.key) {
                return {
                    ...dataEdit,
                    remains: `${+dataEdit.remains - sellValue.remains}`,
                    lastSale: sellValue?.lastSale}
                }
            return item;
        });


        const zeroFilter = tableFix.filter((e)=> (+e.remains > 0))
        const hasSellItem = sellData?.filter((el) => el?.key === dataEdit?.key);
        const tableSellFix = sellData?.map(item => {
            if (item?.key === dataEdit?.key) {
                return {
                    ...dataEdit,
                    remains: Number(item.remains) + Number(sellValue.remains),
                    lastSale: sellValue?.lastSale}
            }
            return item;
        });
        setTableData(zeroFilter.length ? tableFix : zeroFilter);
        setSellData(hasSellItem?.length > 0
            ? tableSellFix
            : [{
                ...dataEdit,
                remains: `${sellValue.remains}`,
                lastSale: sellValue?.lastSale
              },
                ...sellData
            ])}
    const remainsInp = () => {

    }
    // const remainsValidation = () => {
    //     if (+dataEdit?.remains < +sellValue?.remains) {
    //         setErrors({...errors, remainsValue: 'у вас нет столько товаров'})
    //     }
    // }
    // const lastSaleValidation = () => {
    //     if(!sellValue?.lastSale){
    //         setErrors({...errors, lastSaleValue:'введите дату'})
    //     }
    // }

    const sellProduct = (e) => {
        e.preventDefault();
        if (+dataEdit?.remains < +sellValue?.remains) {
            setErrors({...errors, remainsValue: 'у вас нет столько товаров'})
        } else if(!sellValue?.lastSale){
            setErrors({...errors, lastSaleValue:'введите дату'})
        } else {
            setErrors({
                remainsValue: '',
                lastSaleValue: ''
            })
            updateState();
            setShow(!show);
            setSellValue(null)
        }

    }
    const onChange = (e) => {
        setSellValue({...sellValue, [e.target.name]: e.target.value});
    }

    const clickOutside = (e) => {
        if(e.target === e.currentTarget){
            setShow(!show)
        // } else {
        //     console.log('table dataaa', tableData)
        //     console.log('sale dataaa', sellData)
        //     console.log('date', typeof sellValue.lastSale)
        //
        // }
    }}
    return (
        <div onClick={clickOutside} className={show ? styles.containerWrapper : styles.container}>
            <form id='123' className={styles.content}>
                <a onClick={clickXMark} className={styles.close}></a>
                <h1 className={styles.h1}>Sell the product</h1>
                        <span>{errors.remainsValue}</span>
                        <input
                            className={styles.input}
                            type="number"
                            name='remains'
                            onChange={onChange}
                            placeholder='Number of products'
                            value={sellValue && sellValue?.remains ? sellValue?.remains : ''}

                        />
                        <span>{errors.lastSaleValue}</span>
                        <input
                                    className={styles.input}
                                    type="text"
                                    name="lastSale"
                                    onChange={onChange}
                                    value={sellValue &&  sellValue?.lastSale ? sellValue?.lastSale : ''}

                                    placeholder='Date of sale'
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                        />
                <div className={styles.submit} onClick={(e) => sellProduct(e)}>
                    Sell product
                </div>
            </form>
        </div>
    )
}