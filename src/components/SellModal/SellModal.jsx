import styles from './SellModal.module.css'

export const SellModal = ({dataEdit, sellValue, setSellValue, show, setShow, setTableData, tableData, setSellData, sellData}) => {

    const clickXMark = () => {
        setShow(!show)
    }
    const updateState = () => {
        const tableFix = tableData?.map(item => {
                if (item.key === dataEdit.key) {
                return {
                    ...dataEdit,
                    remains: `${+dataEdit.remains - sellValue.remains}`,
                    lastSale: sellValue?.lastSale}
                }
            return item;
        });
        setTableData(tableFix);
        const zeroFilter = tableFix.filter((e)=> (+e.remains > 0))
        setTableData(zeroFilter);
        setSellData([{
            ...dataEdit,
            remains: `${sellValue.remains}`,
            lastSale: sellValue?.lastSale
          },
            ...sellData
        ])
    };

    const sellProduct = (e) => {
        e.preventDefault();
        updateState();
        setShow(!show);
    }
    const onChange = (e) => {
        setSellValue({...sellValue, [e.target.name]: e.target.value});
    }

    const clickOutside = (e) => {
        if(e.target === e.currentTarget){
            setShow(!show)
        }
    }
    return (
        <div onClick={clickOutside} className={show ? styles.containerWrapper : styles.container}>
            <form id='123' className={styles.content}>
                <a onClick={clickXMark} className={styles.close}></a>
                <h1 className={styles.h1}>Sell the product</h1>
                        <input
                            className={styles.input}
                            type="number"
                            name='remains'
                            onChange={onChange}
                            placeholder='Number of products'
                            value={sellValue && sellValue?.remains ? sellValue?.remains : ''}
                            defaultValue={null}
                        />
                        <input
                                    className={styles.input}
                                    type="text"
                                    name="lastSale"
                                    onChange={onChange}
                                    value={sellValue &&  sellValue?.lastSale ? sellValue?.lastSale : ''}
                                    defaultValue={null}
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