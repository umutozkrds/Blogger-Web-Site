import { Injectable } from "@angular/core";
import { User } from "./user.model";

Injectable()
export interface Blog {
    id: string;
    title: string;
    category: string;
    content: string;
    tags: string[];
    user : any | null

}