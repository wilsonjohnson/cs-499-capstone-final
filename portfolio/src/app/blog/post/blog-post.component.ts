import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  post: string;
  private destroy = new Subject<void>();

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.destroy)
    ).subscribe(params => {
        this.post = './assets/blog/post/' +  params['id'] + '.md';
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
