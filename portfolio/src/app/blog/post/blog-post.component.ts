import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef, OnChanges,
  OnInit,
  QueryList,
  SecurityContext, SimpleChanges,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { PostService } from '../../service/post.service';
import { MarkdownService } from 'ngx-markdown';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnChanges {
  post$: Observable<string>;
  private destroy = new Subject<void>();
  private readonly link_orig: ( href: string, title: string, text: string ) => string;

  @ViewChildren('a')
  private anchors: QueryList<ElementRef>;
  private _observer: MutationObserver;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private markdownService: MarkdownService,
    private sanitizer: DomSanitizer,
    private compoenetFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // bind this arg to link function
    // this.link_orig = this.markdownService.renderer.link.bind( this.markdownService.renderer );
    // // override link function
    // this.markdownService.renderer.link = (href: string, title: string, text: string) => {
    //   console.log( href, title, text );
    //   // if link is absolute http call original render function
    //   if ( /^https?:\/\/.*$/.test(href) ) {
    //     return this.link_orig( href, title, text );
    //   }
    //
    //   const click = this.click.bind(this);
    //   const return_value = `<a #test data="${href}"
    //                            class="active">${text}</a>`;
    //   // return this.sanitizer.sanitize( SecurityContext.NONE, return_value );
    //   return return_value;
    // };

    this._observer = new MutationObserver((mutations) => {
      console.log('mutated');
      mutations.forEach((mutation, index) => {
        if (mutation.type === 'childList') {
          this.markdownLoaded();
        }
      })
    });

    this.post$ = this.route.params.pipe(
      takeUntil(this.destroy)
    ).pipe(
      shareReplay(1),
      switchMap( ( { id } ) => this.postService.getpost( id ) )
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public click( href: string = '' ) {
    if ( href ) {
      console.log(href);
    }
  }

  ngOnChanges( changes: SimpleChanges ): void {

  }

  markdownLoaded() {
    this.changeDetectorRef.detectChanges();
  }

  changed( $event: Event ) {
    console.log('changed', $event);
    this.anchors.forEach( anchor => {
      console.log(anchor);
      if ( /^\/.*$/.test(anchor.nativeElement.data) ) {
        anchor.nativeElement.onclick = this.click.bind(this);
      }
    });
  }
}
