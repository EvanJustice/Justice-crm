import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer' ;
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './MyProducts.module.css'
import {ReactComponent as Edit} from "../../assets/Edit.svg";
import {ReactComponent as Delete} from "../../assets/Delete.svg";
import {EditModal} from "../EditModal/EditModal";
import {FC, useState} from "react";
import {SellModal} from "../SellModal/SellModal.js";
import {takeTableData} from "../../redux/tableDataSlice";
import {SnackBar} from "../SnackBar/SnackBar.js";
import {ModalDelete} from "../ModalDelete/ModalDelete";
import {IsellValue, TableDataType} from "../../types/MyTypes";
import {useAppDispatch, useAppSelector} from "../../../hooks";

interface IProductsProps extends IsellValue{
    inputstate: TableDataType
}
export const MyProducts: FC<IProductsProps> = ({inputstate, sellValue, setSellValue}) =>{
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSellModal, setShowSellModal] = useState<boolean>(false);
    const tableData = useAppSelector((state) => state.tableData.tableData)
    const dispatch = useAppDispatch()
    const [delModalActive, setDelModalActive] = useState<boolean>(false)
    const [elKey, setElKey] = useState<number | null>(null)
    const dataEdit = useAppSelector((state) => state.tableData.dataEdit);
    const [value, setValue] = useState<TableDataType>(dataEdit)

    const showEditForm = (item:TableDataType) => {
        dispatch(takeTableData(item));
        setValue(dataEdit)
        setShowModal(!showModal);
    }
    const showSellForm = (item: TableDataType) => {
        dispatch(takeTableData(item));
        setShowSellModal(!showSellModal)
    }

    const tableName = [
        'Product Name',
        'Store',
        'Address',
        'Category',
        'Creation Date',
        'Price',
        'Remains',
        'Weight/Volume',
        'Actions',
    ]
    return (
        <div className={styles.content}>
            <div className={styles.content_}>
                <SnackBar />
                <TableContainer >
                    <Table >
                        <TableHead >
                            <TableRow  className={styles.head} >
                                {tableName?.map((name) => (
                                    <TableCell key={name} sx={{color: 'white'}}>{name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{height: '24px'}}/>
                            {
                                tableData?.map((el, index) => (
                                    <TableRow key={index} className={styles.row} >
                                        <TableCell align={'center'}>{el.productName}</TableCell>
                                        <TableCell align={'center'}>{el.store}</TableCell>
                                        <TableCell className={styles.test} >{el.address}</TableCell>
                                        <TableCell align={'center'}>{el.category}</TableCell>
                                        <TableCell align={'center'}>{el.creationDate}</TableCell>
                                        <TableCell align={'center'}>{'$' + el.price}</TableCell>
                                        <TableCell align={'center'}>{el.remains}</TableCell>
                                        <TableCell align={'center'}>{el.weight + 'kg'}</TableCell>
                                        <TableCell align={'center'}>
                                            <div className={styles.threebuttons}>
                                                    <div className={styles.sell}
                                                         onClick={() => showSellForm(el)}>
                                                        Sell
                                                    </div>
                                                    <Edit className={styles.edit} onClick={() => showEditForm(el)}/>
                                                    <div onClick={() => {
                                                        if(el.key){
                                                            setElKey(el.key)
                                                        }
                                                        setDelModalActive(true)
                                                    }} className={styles.delete}>
                                                        <Delete/>
                                                    </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <ModalDelete elKey={elKey} active={delModalActive} setActive={setDelModalActive}/>
                <EditModal
                    value={value}
                    setValue={setValue}
                    show={showModal}
                    setshow={setShowModal}
                    input={inputstate as any}
                />
                <SellModal
                    sellValue={sellValue}
                    setSellValue={setSellValue}
                    show={showSellModal}
                    setShow={setShowSellModal}
                />
            </div>
        </div>
    )
}