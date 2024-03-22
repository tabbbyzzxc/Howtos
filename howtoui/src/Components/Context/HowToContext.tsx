
import { createContext, FC, useContext } from "react";
import { CreateHowTo } from "../HowTo/Models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostHowTo } from "../HowTo/Service";

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

    return (
        <HowToContext.Provider value={postFunction}>
            {children}
        </HowToContext.Provider>
    );
};