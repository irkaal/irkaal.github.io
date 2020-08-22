import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {HighlightService} from '../../highlight.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewChecked {

  constructor(private highlightService: HighlightService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
