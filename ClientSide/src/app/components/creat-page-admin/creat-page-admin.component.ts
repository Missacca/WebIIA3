import { Component } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";
import {Fundraiser} from "../../models/fundraiser";

@Component({
  selector: 'app-creat-page-admin',
  templateUrl: './creat-page-admin.component.html',
  styleUrl: './creat-page-admin.component.css'
})
export class CreatPageAdminComponent {
  newId=0;
  constructor(private fundraiserService: DataService, private router: Router) {}
  ngOnInit(): void {
    this.loadFundraiser();
  }

  loadFundraiser(): void {
    this.fundraiserService.getLastFundraiserId().subscribe(maxId => {
      this.newId= maxId + 1;
    });
  }

  newFundraiser: Fundraiser = new Fundraiser(this.newId, '', '', '', '', '', true, 0,'');


  //2. a SAVE button to insert a new fundraiser
  CreateFundraiser(): void {
    const newFundraiserData = {
      organizer: this.newFundraiser.ORGANIZER,
      caption: this.newFundraiser.CAPTION,
      targetFunding: this.newFundraiser.TARGET_FUNDING,
      city: this.newFundraiser.CITY,
      categoryId: this.newFundraiser.CATEGORY_ID,
      active:true};
    console.log(newFundraiserData);
    this.fundraiserService.addFundraiser(newFundraiserData).subscribe(() => {
      alert('Fundraiser successfully added!');
      this.router.navigate(['/admin']);  // 跳转回主页
    }, (error) => {
      console.error('Error adding fundraiser:', error);
      // 处理错误情况
    });
  }
}
