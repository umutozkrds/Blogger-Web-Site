import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule} from '@angular/forms';
import { Blog } from '../models/blog.model';
import { BlogService } from '../services/blog.service';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';

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
    private blogService : BlogService
  ) {
    
  }
  ngOnInit(): void {
    
  }

  createBlog(form: NgForm) {
    const blog: Blog = {
      id: uuidv4(), // 
      title: this.model.title,
      category: this.model.category,
      content: this.model.content,
      tags: this.model.tags.split(',') 
    };

    this.blogService.createBlog(blog).subscribe({
      next: (response) => {
        console.log('Blog başarıyla oluşturuldu:', response);
        form.reset(); 
      },
      error: (err) => {
        console.error('Blog oluşturulurken hata oluştu:', err.message);
      }
    });
  }
}
