import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./view/blog-view.module').then( m => m.BlogViewModule )
  }, {
    path: 'post',
    loadChildren: () => import('./post/blog-post.module').then( m => m.BlogPostModule )
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient})
  ]
})
export class BlogModule { }
