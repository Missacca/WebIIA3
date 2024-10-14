import {Component, OnInit} from '@angular/core';
import {Fundraiser} from "../../models/fundraiser";
import {DataService} from "../../data.service";
import {FormControl} from "@angular/forms";
import {AlertComponent} from "../alert/alert.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrl: './home-page-admin.component.css'
})
export class HomePageAdminComponent implements OnInit{
  fundraisers: Fundraiser[] =[];
  organizerControl = new FormControl();
  cityControl = new FormControl();
  categoryControl = new FormControl();
  categories: string[] = [];
  constructor(private fundraiserService: DataService, private dialog: MatDialog) {}
  // selectedFundraiser: Fundraiser = new Fundraiser(0, '', '', '', '', '', true, 0,'');
  selectedFundraiser: Fundraiser[] = [];
  ngOnInit(): void {
    this.loadFundraisers();
    this.fundraiserService.getCategories().subscribe(categories => {
      this.categories = categories.map(category => category.Category_Name);
    });
  }
  //1.Display a list of fundraisers (regardless of their status)
  loadFundraisers(): void {
    this.fundraiserService.getAllFundraisers().subscribe((data) => {
      this.fundraisers = data;
    });
  }

  deleteFundraiser(id: number): void {
    // get fundraiser information
    this.fundraiserService.getOneFundraiser(id).subscribe((data) => {
      const deleteFundraiser: Fundraiser = data[0];
      // check if the fundraiser has made a donation
      if (Number(deleteFundraiser.CURRENT_FUNDING) > 0) {
        alert("Error!!! The Fundraiser has donations!");
        return; // go back directly and avoid further execution
      }

      // if there is no donation delete it
      this.fundraiserService.deleteFundraiser(id).subscribe({
        next: () => { // async operation
          alert("Successfully deleted");
          this.loadFundraisers();
        },
        error: err => {
          console.error('Error deleting fundraiser:', err);
          alert("An error occurred while deleting the fundraiser.");
        }
      });
    }, error => {
      console.error('Error fetching fundraiser:', error);
      alert("An error occurred while fetching the fundraiser.");
    });
  }
  onSearch() {
    const active:number = 0;
    const organizer = this.organizerControl.value;
    const city = this.cityControl.value;
    const category = this.categoryControl.value;
    if(!organizer && !city && !category) {
      this.dialog.open(AlertComponent);
      return;
    }

    this.fundraiserService.searchFundraiser(active, organizer, city, category).subscribe(fundraisers => {
      this.selectedFundraiser = fundraisers;
    });
  }
  onClear() {
    this.organizerControl.setValue('');
    this.cityControl.setValue('');
    this.categoryControl.setValue('');

    this.selectedFundraiser = [];
  }

  protected readonly sessionStorage = sessionStorage;
}
