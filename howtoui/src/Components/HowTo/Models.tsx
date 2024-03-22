export interface HowTo{
    id: number;
    title: string;
    description: string;
    date: Date;
    favorite: boolean;
}

export interface EditHowTo{
    id: number;
    title: string;
    description: string;
    favorite: boolean;
}

export interface CreateHowTo{
    title: string;
    description: string;
    rawDate: {year: number, month: number, day: number, hours: number, minutes: number};
    favorite: boolean;
}