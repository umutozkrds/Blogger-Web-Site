import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Blog } from "../models/blog.model";
import { Observable } from "rxjs";

@Injectable()
export class BlogService {

    constructor(
        private http: HttpClient
    ) {
        
    }

    private url = 'https://blogger-app-b7187-default-rtdb.firebaseio.com/'

    createBlog(blog: Blog) : Observable<Blog> {
        return this.http.post<Blog>(`${this.url}blogs.json`, blog)
    }
}