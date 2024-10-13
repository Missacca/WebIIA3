import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Fundraiser} from "../../models/fundraiser";
import {ActivatedRoute, Router} from "@angular/router";
import {Donation} from "../../models/donation";

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent implements OnInit {
  fundraiserId: number = 0;
  fundraisers: any;
  fundraiser:Fundraiser= new Fundraiser(0, '', '', '', '', '', true, 0,'');

  amount: number = 0;
  giver:string='';
  constructor(private dataService:DataService, private router: Router,private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.fundraiserId = Number(id);
      this.loadFundraiser(this.fundraiserId);
    });

  }
  public  loadFundraiser(id: number): void {
    // obtain fundraiser data from the services
    this.dataService.getFundraiserById(id).subscribe(data => {
      this.fundraisers = data;
      this.fundraiser = this.fundraisers[0];
    });
  }
  onSubmit(): void {

    if (this.amount < 5) {
      alert('Donation amount must be larger than $5');
      return;
    }

    const donation = {
      FUNDRAISER_ID: this.fundraiserId,
      AMOUNT: this.amount,
      GIVER: this.giver
    };

    this.dataService.CreateDonation(donation).subscribe({
      next: (response) => {
        alert('Thank you for your donation to ' + this.fundraiser.CAPTION);
        this.resetForm();

        this.router.navigate(['/fundraiser/' + this.fundraiserId]).then(() => {
          this.resetForm();
        });
      },
      error: (error) => {
        console.error('Error creating donation:', error);
        alert('There was an error processing your donation. Please try again.');
      }
    });
  }


  // Reset the form
  private resetForm(): void {
    this.amount = 0;
    this.giver = '';
  }

}
