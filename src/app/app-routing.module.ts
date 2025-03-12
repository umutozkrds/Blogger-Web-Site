import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

const routes: Routes = [
  { path : '', component : CreateBlogComponent},
  { path: 'create-blog', component: CreateBlogComponent },
  { path: 'blogs', component: BlogListComponent },
  { path : 'blog/:id', component: BlogDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
