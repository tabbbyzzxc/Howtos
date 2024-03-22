import { Get, Post } from "../Axios/Axios";
import { CreateHowTo } from "./Models";

export async function GetHowTos() {
    const response = await Get(`howto/get-howtos`);
    return response.data;
}

export async function PostHowTo(request: CreateHowTo){
    const response = await Post(`howto/create-howto`, request);
}