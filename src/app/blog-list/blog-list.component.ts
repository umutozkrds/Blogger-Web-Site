import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-blog-list',
  standalone: false,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [
    {
      id: 1,
      title: 'Angular ile Blog Uygulaması',
      category: 'Web Geliştirme',
      content: 'Angular kullanarak modern ve ölçeklenebilir bir blog uygulaması nasıl geliştirilir? ',
      tags: ['Angular', 'TypeScript', 'Web']
    },
    {
      id: 2,
      title: 'Veri Bilimi ve Python',
      category: 'Makine Öğrenmesi',
      content: 'Python ve veri bilimi ile büyük veri analizleri nasıl yapılır?',
      tags: ['Python', 'Data Science', 'Machine Learning']
    }
  ];
  
    ngOnInit(): void {
      
    }
}
