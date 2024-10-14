import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Fundraiser} from "../../models/fundraiser";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  organizerControl = new FormControl();
  cityControl = new FormControl();
  categoryControl = new FormControl();

  categories: string[] = [];
  fundraisers: Fundraiser[] = [];

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // 获取类别数据
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories.map(category => category.Category_Name);
    });
  }

  onSearch() {
    const organizer = this.organizerControl.value;
    const city = this.cityControl.value;
    const category = this.categoryControl.value;
    if(!organizer && !city && !category) {
      this.dialog.open(AlertComponent);
      return;
    }

    this.dataService.searchFundraiser(organizer, city, category).subscribe(fundraisers => {
      this.fundraisers = fundraisers;
    });
  }
  onClear() {
    this.organizerControl.setValue('');
    this.cityControl.setValue('');
    this.categoryControl.setValue('');

    this.fundraisers = [];
  }

}
