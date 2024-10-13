import {Component, OnInit} from '@angular/core';
import {Fundraiser} from "../../models/fundraiser";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 fundraisers: Fundraiser[] = []; // initial fundraiser array
  constructor(private dataService:DataService) {
  }
  ngOnInit():void {
    this.getFundraisers();
  }

  public getFundraisers() {
    this.dataService.getActiveFundraiser().subscribe(
      (data: any) => {
        this.fundraisers = data;
      });
  }
}
