import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { CreateHowTo } from "../HowTo/Models";
import { Post } from "../Axios/Axios";
import { PostHowTo } from "../HowTo/Service";
import { useMutation } from "@tanstack/react-query";
import { useHowToContext } from "../Context/HowToContext";

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const postFunction = useHowToContext();

    return (
        <>
            <Button variant="outlined" startIcon={<AddSharpIcon />} onClick={handleClickOpen}>
                Create
            </Button>
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
                        const createHowTo: CreateHowTo = {
                            title: formData.get('title') as string,
                            description: formData.get('description') as string,
                            rawDate:{
                                year: d.getFullYear(),
                                month: d.getMonth() + 1,
                                day: d.getDate(),
                                hours: d.getHours(),
                                minutes: d.getMinutes()
                            },
                            favorite: false,
                        };
                        postFunction.mutate(createHowTo);
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
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Description"
                        name="description"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}