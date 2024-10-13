import { Component,OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Fundraiser} from "../fundraiser";

@Component({
  selector: 'Home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  fundraisers: Fundraiser[] =[];
  searchId=0;
  constructor(private fundraiserService: DataService) {}
  selectedFundraiser: Fundraiser = new Fundraiser(0, '', '', '', '', '', true, 0);
  showin=false;
  ngOnInit(): void {
    this.loadFundraisers();
    this.showin=false;
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

  searchFundraiser() {
    this.fundraiserService.getOneFundraiser(this.searchId).subscribe((data) => {
      if(data[0]){
        this.selectedFundraiser= data[0];
        this.showin=true;
      }else {
        alert("Error!!!Please enter valid Fundraiser!");
      }

    });

  }

  protected readonly sessionStorage = sessionStorage;
}
