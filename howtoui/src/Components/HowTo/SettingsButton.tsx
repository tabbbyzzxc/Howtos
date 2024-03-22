import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FC, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import FormDialog from "../Navigation/FormDialog";
import { HowTo } from "./Models";
import DeleteDialog from "./HowToDeleteDialog";

interface SettingsProps{
    howTo: HowTo
}
const HowToVertSettings:FC<SettingsProps> = ({howTo}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onEditClick = () => {
        setIsEdit(true);
        handleClose();
    }

    const onDeleteClick = () => {
        setIsDelete(true);
        handleClose();
    }

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={
                    { mt: "1px", "& .MuiMenu-paper":
                            { backgroundColor: "transparent", },
                    }
                }
            >
                <MenuItem onClick={onEditClick}>Edit</MenuItem>
                <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
            </Menu>
            {isEdit && <FormDialog howTo={howTo} onEditClose={setIsEdit}/>}
            {isDelete && <DeleteDialog id={howTo.id} onDeleteClose={setIsDelete}/>}
        </div>
    );
}

export default HowToVertSettings;