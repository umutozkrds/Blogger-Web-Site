import { Injectable } from "@angular/core";

Injectable()
export interface Blog {
    id: number;
    title: string;
    category: string;
    content: string;
    tags: string[];

}