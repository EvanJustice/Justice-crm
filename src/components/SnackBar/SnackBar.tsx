import Snackbar from '@mui/material/Snackbar';
import {Alert, Slide, useMediaQuery} from "@mui/material";
import {toggleOpen} from "../../redux/snackBarSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";


export const SnackBar = () =>{
    const open = useAppSelector((state)=> state.snackBar.isOpen)
    const is720 = useMediaQuery('(min-width:720px)')
    const dispatch = useAppDispatch()
    const text = useAppSelector((state) => state.snackBar.alert.text)
    const severity = useAppSelector((state)=> state.snackBar.alert.severity)
    const action = useAppSelector((state) => state.snackBar.alert.action)
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
                      autoHideDuration={1000}
                      sx={ is720 ? null : {marginTop: '130px'}}
                      >
                <Alert  severity={action === 'editProf' ?
                        severity.info : action === 'editProd' ?
                        severity.info : action === 'editPass'?
                        severity.warning : action === 'delete'?
                            severity.warning : action === 'create' ?
                            severity.success : severity.success}>
                    {action === 'create' ?
                        text.created : action === 'editProd' ?
                            text.edited.product : action === 'editProf' ?
                                text.edited.profile : action === 'editPass' ?
                                    text.edited.password : action === 'sell' ?
                                        text.sold : text.deleted}
                </Alert>
            </Snackbar>
        </>
    )
}