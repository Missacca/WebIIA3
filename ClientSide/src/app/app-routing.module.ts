import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent} from "./components/search/search.component";
import { HomeComponent } from "./components/home/home.component";
import {FundraiserComponent} from "./components/fundraiser/fundraiser.component";
import {DonateComponent} from "./components/donate/donate.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'fundraiser/:id', component: FundraiserComponent},
  {path: 'donate/:id', component: DonateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
