import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post.component';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BlogPostComponent},
      { path: ':id', component: BlogPostComponent, pathMatch: 'full'}
    ]),
    MarkdownModule.forChild()
  ]
})
export class BlogPostModule { }
