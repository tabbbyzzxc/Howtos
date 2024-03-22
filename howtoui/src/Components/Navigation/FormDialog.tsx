import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { CreateHowTo, EditHowTo, HowTo } from "../HowTo/Models";
import { useHowToContext } from "../Context/HowToContext";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Dispatch, FC, SetStateAction, useState } from "react";

interface formProps{
    howTo?: HowTo;
    onEditClose?: Dispatch<SetStateAction<boolean>>;
}

const FormDialog:FC<formProps> = ({howTo, onEditClose }) => {
    const [open, setOpen] = useState(!!howTo);
    const [selected, setSelected] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (onEditClose) {
            onEditClose(false);
        }
        setOpen(false);
    };

    const {postFunction, putFunction, deleteFunction} = useHowToContext();

    return (
        <>
            {!howTo && <Button variant="outlined" startIcon={<AddSharpIcon/>} onClick={handleClickOpen}>
                Create
            </Button>}
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{backdropFilter:"blur(10px)"}}
                PaperProps={{
                    component: 'form',
                    style: {
                        background: 'transparent',
                        boxShadow: 'none',
                    },
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const d = new Date();
                        if(howTo){
                            const editHowTo: EditHowTo = {
                                id: howTo.id,
                                title: formData.get('title') as string,
                                description: formData.get('description') as string,
                                favorite: howTo.favorite,
                            };
                            putFunction.mutate(editHowTo);
                        }
                        else {
                            const createHowTo: CreateHowTo = {
                                title: formData.get('title') as string,
                                description: formData.get('description') as string,
                                rawDate: {
                                    year: d.getFullYear(),
                                    month: d.getMonth() + 1,
                                    day: d.getDate(),
                                    hours: d.getHours(),
                                    minutes: d.getMinutes()
                                },
                                favorite: false,
                            };
                            postFunction.mutate(createHowTo);
                        }
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Create new <b>How To</b></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Think about some catchy name so,
                        that later it will be easier to find your How To.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={howTo ? howTo.title : ''}
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Short description"
                        name="description"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="standard"
                        defaultValue={howTo ? howTo.description : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{howTo ? <><EditOutlinedIcon/> Update</> : <><AddSharpIcon/>Create</>}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FormDialog;