import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule} from '@angular/forms';
import { Blog } from '../models/blog.model';
import { BlogService } from '../services/blog.service';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  standalone: false,
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css',
  providers : [BlogService]
})
export class CreateBlogComponent implements OnInit{
  model: any = {};
  err: any = {};
  


  constructor(
    private blogService: BlogService,
    private route : Router
  ) {
    
  }
  ngOnInit(): void {
    
  }

  createBlog(form: NgForm) {

    const storedUser = localStorage.getItem("user")
    const blog: Blog = {
      id: uuidv4(), // 
      title: this.model.title,
      category: this.model.category,
      content: this.model.content,
      tags: this.model.tags.split(','),
      user : storedUser ? JSON.parse(storedUser) : null
    }; 

    this.blogService.createBlog(blog).subscribe({
      next: (response) => {
        console.log('Blog başarıyla oluşturuldu:', response, blog);
        form.reset(); 
        this.route.navigate(["/"])
      },
      error: (err) => {
        console.error('Blog oluşturulurken hata oluştu:', err.message);
      }
    });
  }
}
