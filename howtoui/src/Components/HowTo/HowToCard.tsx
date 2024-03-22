import React, { FC, useState } from "react";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from "@mui/material/Typography";
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { HowTo } from "./Models";

interface HowToCardProps{
    howTo: HowTo;
}
const HowToCard:FC<HowToCardProps> = ({howTo}) => {
    const {title, description, date, favorite} = howTo;
    const [isFavorite, setIsFavorite] = useState(favorite);
    const parsedDate = new Date(date);
    const onFavoriteChange = (state: boolean) => {
        setIsFavorite(state);
    }
    return(
        <Card style={{backgroundColor: "#0f1924"}} sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={parsedDate.toDateString()}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => onFavoriteChange(!isFavorite)}>
                    {isFavorite ? <FavoriteSharpIcon/> : <FavoriteBorderSharpIcon/>}
                </IconButton>
            </CardActions>
        </Card>
    );
}
export default HowToCard;