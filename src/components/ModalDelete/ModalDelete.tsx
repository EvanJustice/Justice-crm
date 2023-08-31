import styles from './ModalDelete.module.css'
import {deleteRow} from "../../redux/tableDataSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {switchAction, toggleOpen} from "../../redux/snackBarSlice.ts";

export const ModalDelete = ({ elKey, active, setActive}) => {
    const dispatch = useDispatch()
    const action = useSelector((state) => state.snackBar.alert.action)
    const deleteItem = () =>{
        dispatch(switchAction('delete'))
        dispatch(deleteRow(elKey))
        setActive(false)
        dispatch(toggleOpen())
    }
    return(
        <div className={active ? styles.contentActive : styles.content}>
            <h1>Подтвердите удаление!</h1>
            <h6 className={styles.h6}>Хотите удалить товар?</h6>
            <div className={styles.buttBox}>
                <button onClick={() => deleteItem()} className={styles.button}>да</button>
                <button onClick={()=> setActive(false)} className={styles.button}>нет</button>
            </div>
        </div>
    )

}