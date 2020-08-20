import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
// import { BlogComponent } from './resume/blog.component';

const routes: Routes = [
    { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
    // { path: 'blog', component: BlogComponent, data: { animation: 'BlogPage' } }
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
