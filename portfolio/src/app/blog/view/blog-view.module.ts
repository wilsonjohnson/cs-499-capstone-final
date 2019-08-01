import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogViewComponent } from './blog-view.component';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [BlogViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: BlogViewComponent }
    ]),
    MarkdownModule.forChild()
  ]
})
export class BlogViewModule { }
