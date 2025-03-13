import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog.model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: false,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
  providers : [BlogService]
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService : BlogService) {
  }
  
    ngOnInit(): void {
      this.blogService.getProducts().subscribe(data => {
        this.blogs = data;
      })
    }
}
