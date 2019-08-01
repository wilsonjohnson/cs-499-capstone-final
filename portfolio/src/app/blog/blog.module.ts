import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

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

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MarkdownModule.forRoot(
      { markedOptions: {
          provide: MarkedOptions,
          useFactory: markedOptionsFactory
        }
      }
    )
  ]
})
export class BlogModule { }
