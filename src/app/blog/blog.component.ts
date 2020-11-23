import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private scully: ScullyRoutesService) { }

  $blogPosts: Observable<ScullyRoute[]> = this.scully.available$.pipe(
    map((routes: ScullyRoute[]) => {
      const mdRoutes: ScullyRoute[] = routes.filter((route: ScullyRoute) =>
        route.route.startsWith('/blog/') && route.sourceFile.endsWith('.md')
      );
      mdRoutes.sort((a: ScullyRoute, b: ScullyRoute) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return mdRoutes;
    })
  );

  ngOnInit(): void {
  }

}
