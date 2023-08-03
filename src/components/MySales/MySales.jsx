import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from "../MyProducts/MyProducts.module.css";

export const MySales = ({sellData}) =>{
const cells = [
    'Product Name',
    'Store',
    'Address',
    'Category',
    'Creation Date',
    'Price',
    'Sold items',
    'Weight/Volume',
    'Last sale',
]
    return (
        <>
            <TableContainer >
                <Table>
                    <TableHead >
                        <TableRow className={styles.head} >
                            {
                                cells.map((name, index) => (
                                    <TableCell key={index} sx={{color: 'white'}}>{name}</TableCell>
                                    )
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{height: '24px'}}/>
                    {
                        sellData.map((el, index) => (
                            <TableRow key={index} className={styles.row} >
                                <TableCell align={'center'}>{el.productName}</TableCell>
                                <TableCell align={'center'}>{el.store}</TableCell>
                                <TableCell align={'center'}>{el.address}</TableCell>
                                <TableCell align={'center'}>{el.category}</TableCell>
                                <TableCell align={'center'}>{el.creationDate}</TableCell>
                                <TableCell align={'center'}>{'$' + el.price}</TableCell>
                                <TableCell align={'center'}>{el.remains}</TableCell>
                                <TableCell align={'center'}>{el.weight + 'kg'}</TableCell>
                                <TableCell align={'center'}>{el.lastSale}</TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}