import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { FC, useEffect, useState } from "react";
import HowToCard from "./HowToCard";
import { Backdrop, CircularProgress, Container, Fade, Grow, Slide } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { Get } from "../Axios/Axios";
import { HowTo } from "./Models";
import { GetHowTos } from "./Service";

function getsmthing(){
    return;
}

const HowToPage:FC = () => {
    const {data: howtos, status: howtoStatus, isFetching} = useQuery<HowTo[]>(
        {
            queryKey: ['howtos'],
            queryFn: GetHowTos
        });
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        // If data fetching is done and it's the first load, set firstLoad to false
        if (!isFetching && firstLoad) {
            setFirstLoad(false);
        }
    }, [isFetching, firstLoad]);

    if(howtoStatus === 'pending'){
        return(
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }


    return(
        <Container maxWidth={"xl"}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                {
                    howtos!.map((item, index) => (
                    <Fade /*style={{ transformOrigin: '0 0 0' }}*/ in={true} {...((!isFetching && firstLoad) ? { timeout: 1000 + index * 100 } : {timeout: 500})}>
                        <Grid item xs={2}>
                            <HowToCard howTo={item}/>
                        </Grid>
                    </Fade>
                ))}
            </Grid>
        </Container>
    );
}
export default HowToPage;