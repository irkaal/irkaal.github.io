import { ViewportScroller } from '@angular/common';
import { Component, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  constructor(
    private _viewportScroller: ViewportScroller,
    private _route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this._route.fragment.subscribe((fragment: string) => {
      this._viewportScroller.scrollToAnchor(fragment);
    });
  }
}
