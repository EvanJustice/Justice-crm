import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer' ;
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './MyProducts.module.css'
import {ReactComponent as Edit} from "../../assets/Edit.svg";
import {ReactComponent as Delete} from "../../assets/Delete.svg";
import {EditModal} from "../EditModal/EditModal.jsx";
import {useState} from "react";
import {SellModal} from "../SellModal/SellModal.jsx";

export const MyProducts = ({sellData, setSellData, tableData, setTable, inputstate, sellValue, setSellValue}) =>{
    const [showModal, setShowModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)
    const [dataEdit, setDataEdit] = useState(null)
    const showEditForm = (item) => {
        setDataEdit(item);
        setShowModal(!showModal)
    }
    const showSellForm = (item) => {
        setDataEdit(item);
        setShowSellModal(!showSellModal)
    }

    const deleteRow = (key) => {
        let row = [...tableData].filter((el) => (
            el.key !== key
        ))
        setTable(row)
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
        <>
            <TableContainer >
                <Table >
                    <TableHead >
                        <TableRow  className={styles.head} align="center">
                            {tableName?.map((name) => (
                                <TableCell key={name} sx={{color: 'white'}}>{name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{height: '24px'}} align="center" />
                        {
                            tableData.map((el, index) => (
                                <TableRow key={index} className={styles.row} align="center">
                                    <TableCell align={'center'}>{el.productName}</TableCell>
                                    <TableCell align={'center'}>{el.store}</TableCell>
                                    <TableCell className={styles.test} >{el.address}</TableCell>
                                    <TableCell align={'center'}>{el.category}</TableCell>
                                    <TableCell align={'center'}>{el.creationDate}</TableCell>
                                    <TableCell align={'center'}>{'$' + el.price}</TableCell>
                                    <TableCell align={'center'}>{el.remains}</TableCell>
                                    <TableCell align={'center'}>{el.weight + 'kg'}</TableCell>
                                    <TableCell align={'center'}>
                                        <div className={styles.threebuttons} >
                                                <div className={styles.sell}
                                                     onClick={() => showSellForm(el)}>
                                                    Sell
                                                </div>
                                                <Edit onClick={() => showEditForm(el)}/>
                                                <div onClick={() =>deleteRow(el.key)} className={styles.delete}>
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
            <EditModal
                dataEdit={dataEdit}
                show={showModal}
                setshow={setShowModal}
                input={inputstate}
                tableData={tableData}
                setTableData={setTable}
            />
            <SellModal
                setSellData={setSellData}
                sellData={sellData}
                sellValue={sellValue}
                setSellValue={setSellValue}
                dataEdit={dataEdit}
                setData={setDataEdit}
                show={showSellModal}
                setShow={setShowSellModal}
                tableData={tableData}
                setTableData={setTable}
            />
        </>
    )
}