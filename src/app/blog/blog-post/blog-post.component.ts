import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { HighlightService } from '../../highlight.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewChecked {
  
  constructor(
    private highlightService: HighlightService,
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.$postMetadata.subscribe(data => {
      if (!data) {
        this.router.navigate(['...'], { skipLocationChange: true });
      }
    });
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  $postMetadata = combineLatest([
    this.activatedRoute.params.pipe(pluck('postId')), this.scully.available$
  ]).pipe(
    map(([postId, routes]) => routes.find(route => route.route === `/blog/${postId}`))
  );

}
