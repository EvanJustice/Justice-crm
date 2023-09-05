import styles from './ModalDelete.module.css'
import {deleteRow} from "../../redux/tableDataSlice";
import {switchAction, toggleOpen} from "../../redux/snackBarSlice";
import {Dispatch, FC, SetStateAction} from "react";
import {useAppDispatch} from "../../../hooks";

interface IModalDeleteProps {
    elKey: number | null
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
}
export const ModalDelete: FC<IModalDeleteProps> = ({ elKey, active, setActive}) => {
    const dispatch = useAppDispatch()
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