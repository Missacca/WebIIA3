import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbar} from "@angular/material/toolbar";
import { MatIcon, MatIconModule} from "@angular/material/icon";
import { MatButton, MatIconButton, MatButtonModule} from "@angular/material/button";
import { SearchComponent } from './components/search/search.component';
import { MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule} from "@angular/common/http";
import { FundraiserComponent } from './components/fundraiser/fundraiser.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatOption} from "@angular/material/autocomplete";
import {MatFormField} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import { MatOptionModule } from '@angular/material/core';
import { AlertComponent } from './components/alert/alert.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { DonateComponent } from './components/donate/donate.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatInput} from "@angular/material/input";
import { PostpageAdminComponent } from './components/postpage-admin/postpage-admin.component';
import { CreatPageAdminComponent } from './components/creat-page-admin/creat-page-admin.component';
import { HomePageAdminComponent } from './components/home-page-admin/home-page-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    FundraiserComponent,
    AlertComponent,
    DonateComponent,
    PostpageAdminComponent,
    CreatPageAdminComponent,
    HomePageAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    MatCard,
    MatCardContent,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOptionModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatInput,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
