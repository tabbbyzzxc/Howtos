import { Delete, Get, Post, Put } from "../Axios/Axios";
import { CreateHowTo, EditHowTo } from "./Models";

export async function GetHowTos() {
    const response = await Get(`howto/get-howtos`);
    return response.data;
}

export async function PostHowTo(request: CreateHowTo){
    const response = await Post(`howto/create-howto`, request);
}

export async function UpdateHowTo(request: EditHowTo) {
    const response = await Put(`howto/update-howto`, request);
}

export async function DeleteHowTo(request: number) {
    const response = await Delete(`howto/delete-howto/${request}`);
}