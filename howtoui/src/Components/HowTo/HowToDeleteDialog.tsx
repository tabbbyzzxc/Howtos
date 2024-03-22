import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useHowToContext } from "../Context/HowToContext";
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

interface DeleteDialogProps{
    id: number;
    onDeleteClose: Dispatch<SetStateAction<boolean>>;
}
const DeleteDialog:FC<DeleteDialogProps> = ({id, onDeleteClose}) => {
    const [open, setOpen] = useState(true);
    const {postFunction, putFunction, deleteFunction} = useHowToContext();
    const handleClose = () => {
        onDeleteClose(false);
        setOpen(false);
    };

    const handleDelete = () =>{
        deleteFunction.mutate(id);
        handleClose();
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{backdropFilter:"blur(10px)"}}
                PaperProps={{
                        component: 'form',
                        style: {
                            background: 'transparent',
                            boxShadow: 'none',
                        }}}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this How To?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        <DeleteOutlineSharpIcon/>Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default DeleteDialog;