import React, { FC, useState } from "react";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { EditHowTo, HowTo } from "./Models";
import Typography from "@mui/material/Typography";
import { ftruncate } from "fs";
import HowToVertSettings from "./SettingsButton";
import { useHowToContext } from "../Context/HowToContext";



interface HowToCardProps{
    howTo: HowTo;
}

function truncate(value: string){
    return value.length > 25 ? value.substring(0, 22) + "..." : value;
}

const HowToCard:FC<HowToCardProps> = ({howTo}) => {
    const {title, description, date, favorite} = howTo;
    const [isFavorite, setIsFavorite] = useState(favorite);
    const parsedDate = new Date(date);
    const {putFunction} = useHowToContext();
    const onFavoriteChange = (state: boolean) => {
        setIsFavorite(state);
        const editHowTo: EditHowTo = {
            id:howTo.id,
            title:howTo.title,
            description:howTo.description,
            favorite: state,
        }
        putFunction.mutate(editHowTo);
    }
    return(
        <Card style={{backgroundColor: "#0f1924"}} sx={{ maxWidth: 345,}} >
            <CardHeader
                action={
                    <HowToVertSettings howTo={howTo}/>
                }
                title={title}
                subheader={parsedDate.toDateString()}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word" }}>
                    {truncate(description)}
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