import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements OnInit {
  constructor(private _scully: ScullyRoutesService) {}

  public blogPosts: Observable<ScullyRoute[]> = this._scully.available$.pipe(
    map((routes: ScullyRoute[]) => {
      const mdRoutes: ScullyRoute[] = routes.filter(
        (route: ScullyRoute) =>
          route.route.startsWith('/blog/') &&
          route.sourceFile &&
          route.sourceFile.endsWith('.md')
      );
      mdRoutes.sort((a: ScullyRoute, b: ScullyRoute) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return mdRoutes;
    })
  );

  ngOnInit() {}
}
