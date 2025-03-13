import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Blog } from "../models/blog.model";
import { delay, map, Observable } from "rxjs";

@Injectable()
export class BlogService {

    constructor(
        private http: HttpClient
    ) {
        
    }

    private url = 'https://blogger-app-b7187-default-rtdb.firebaseio.com/'

    getProducts() : Observable<Blog[]> {
        return this.http.get<Blog[]>(this.url + "blogs.json").pipe(
            map(data => {
                const blogs: Blog[] = [];

                for (let key in data) {
                    blogs.push({ ...data[key], id: key })
                }

                return blogs
            }),
            delay(1000)
        );
    }

    createBlog(blog: Blog) : Observable<Blog> {
        return this.http.post<Blog>(`${this.url}blogs.json`, blog)
    }
}