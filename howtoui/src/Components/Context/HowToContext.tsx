
import { createContext, FC, useContext, useState } from "react";
import { CreateHowTo, EditHowTo } from "../HowTo/Models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteHowTo, PostHowTo, UpdateHowTo } from "../HowTo/Service";
import { Update } from "@mui/icons-material";

interface ContextType {
    postFunction: (howto: CreateHowTo) => void;
}

const defaultContextValue: ContextType = {
    postFunction: () => {}
};


const HowToContext = createContext<any>(defaultContextValue);

export const useHowToContext = () => useContext(HowToContext);

interface HowToProviderProps {
    children: React.ReactNode; // Specify the type of children prop
}

export const ContextProvider:FC<HowToProviderProps> = ({ children }) => {
    const queryClient = useQueryClient();
    const postFunction = useMutation({
        mutationFn: (data: CreateHowTo) => PostHowTo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['howtos'] })
        },
    })

    const putFunction = useMutation({
        mutationFn: (data: EditHowTo) => UpdateHowTo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['howtos'] });
        }
    })

    const deleteFunction = useMutation({
        mutationFn: (data: number) => DeleteHowTo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['howtos'] });
        }
    })

    return (
        <HowToContext.Provider value={{postFunction, putFunction, deleteFunction}}>
            {children}
        </HowToContext.Provider>
    );
};