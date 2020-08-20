import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  lastModified: Date;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.http.get('https://api.github.com/repos/irkaal/irkaal.github.io').subscribe((data: any) => {
      this.lastModified = new Date(data['pushed_at']);
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
