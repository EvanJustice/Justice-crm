import Snackbar from '@mui/material/Snackbar';
import {Alert, Slide} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {toggleOpen} from "../../app/snackBarSlice.js";


export const SnackBar = () =>{
    const open = useSelector((state)=> state.snackBar)
    const dispatch = useDispatch()
    const handleClose = () => {
        if(open === true){
            dispatch(toggleOpen())
        } else {
            dispatch(toggleOpen())
        }
    }
    return (
        <>
            <Snackbar open={open}
                      onClose={handleClose}
                      anchorOrigin={{horizontal: 'center', vertical: 'top'}}
                      TransitionComponent={Slide}
                      autoHideDuration={1500} >
                <Alert  severity="success">
                    Изменения Сохранены!
                </Alert>
            </Snackbar>
        </>
    )
}