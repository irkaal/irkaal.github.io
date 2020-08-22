import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  githubAvatar: string;

  constructor(
    private highlightService: HighlightService,
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(
      'https://api.github.com/users/irkaal'
    ).subscribe((data: any) => {
      this.githubAvatar = data['avatar_url'];
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
