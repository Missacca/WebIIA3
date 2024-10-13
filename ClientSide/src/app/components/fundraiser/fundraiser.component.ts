import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Fundraiser} from "../../models/fundraiser";
import {ActivatedRoute, Router} from '@angular/router';
import {Donation} from "../../models/donation";

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css'
})
export class FundraiserComponent implements OnInit {
  fundraiserId: number = 0;
  fundraisers: any;
  fundraiser:Fundraiser= new Fundraiser(0, '', '', '', '', '', true, 0,'');
  donations: any;
  displayedColumns: string[] = ['date', 'amount', 'giver'];
  constructor(private dataService:DataService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.fundraiserId = Number(id);
      this.loadFundraiser(this.fundraiserId);
      this.loadDonations(this.fundraiserId)
    });
  }

  public  loadFundraiser(id: number): void {
    // obtain fundraiser data from the services
    this.dataService.getFundraiserById(id).subscribe(data => {
      this.fundraisers = data;
      this.fundraiser = this.fundraisers[0];
    });
  }
  public loadDonations(id:number) {
    this.dataService.getDonations(id).subscribe(
      (data: any) => {
        this.donations = data;
      });
  }

}
