import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterLink, RouterModule, RouterOutlet, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormsModule} from "@angular/forms";
import { PostpageComponent } from './postpage/postpage.component';
import { CreatPageComponent } from './creat-page/creat-page.component';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonToggle} from "@angular/material/button-toggle";
import { HomePageComponent } from './home-page/home-page.component';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
const routes: Routes = [
  { path: 'admin', component: HomePageComponent },
  { path: 'add', component: CreatPageComponent  },
  { path: 'Change', component: PostpageComponent  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    PostpageComponent,
    CreatPageComponent,
    HomePageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        FormsModule,
        MatButtonToggle,
        MatButton,
        MatIcon,
        MatToolbar,
        RouterLink,
        RouterOutlet,
    ],
  exports: [RouterModule],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
