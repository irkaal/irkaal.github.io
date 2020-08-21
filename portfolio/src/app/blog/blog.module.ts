import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

import {ScullyLibModule} from '@scullyio/ng-lib';

@NgModule({
  declarations: [BlogComponent, BlogPostComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ScullyLibModule
  ]
})
export class BlogModule { }
