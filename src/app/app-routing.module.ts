import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path : '', component : BlogListComponent},
  { path: 'create-blog', component: CreateBlogComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path : "auth", component : AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
