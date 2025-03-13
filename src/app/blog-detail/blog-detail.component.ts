import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: false,
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
  providers : [BlogService]
})
export class BlogDetailComponent implements OnInit{
  
  blog : Blog | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {
    
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params["id"];
      this.blogService.getBlogById(id).subscribe(result => {
        this.blog = result;
      })
    })
  }
}
