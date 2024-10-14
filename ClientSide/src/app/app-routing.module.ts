import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent} from "./components/search/search.component";
import { HomeComponent } from "./components/home/home.component";
import {FundraiserComponent} from "./components/fundraiser/fundraiser.component";
import {DonateComponent} from "./components/donate/donate.component";
import {HomePageAdminComponent} from "./components/home-page-admin/home-page-admin.component";
import {PostpageAdminComponent} from "./components/postpage-admin/postpage-admin.component";
import {CreatPageAdminComponent} from "./components/creat-page-admin/creat-page-admin.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'fundraiser/:id', component: FundraiserComponent},
  {path: 'donate/:id', component: DonateComponent},
  {path: 'admin', component: HomePageAdminComponent,},
  { path: 'add', component: CreatPageAdminComponent  },
  { path: 'Change', component: PostpageAdminComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
