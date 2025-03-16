import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Blog } from "../models/blog.model";
import { delay, exhaustMap, map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class BlogService {

    constructor(
        private http: HttpClient,
        private authService : AuthService
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
        );
    }

    getBlogById(id: string): Observable<Blog> {
        return this.http.get<Blog>(this.url + "blogs/" + id + ".json")
    }

    createBlog(blog: Blog): Observable<Blog> {
        
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.post<Blog>(`${this.url}blogs.json?auth=${user?.token}`, blog)
            })
        )
        
    }
}