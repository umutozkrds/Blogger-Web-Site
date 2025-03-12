import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: false,
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit{
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
  blog : any;

  constructor(
    private route : ActivatedRoute
  ) {
    
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // URL'den gelen id'yi al
    if (id) {
      this.blog = this.blogs.find(b => b.id === +id); // ID ile eşleşen blogu bul
    }
  }
}
