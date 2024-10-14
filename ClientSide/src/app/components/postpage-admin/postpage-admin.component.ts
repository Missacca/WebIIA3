import {Component, OnInit} from '@angular/core';
import {Fundraiser} from "../../models/fundraiser";
import {ActivatedRoute, Router} from '@angular/router';
import { DataService} from "../../data.service";

@Component({
  selector: 'app-postpage-admin',
  templateUrl: './postpage-admin.component.html',
  styleUrl: './postpage-admin.component.css'
})
export class PostpageAdminComponent implements OnInit {
  constructor(private fundraiserService: DataService, private router: Router,private route: ActivatedRoute) {}
  fundraiserId: number | null = null; // 存储 ID
  selectedFundraiser: Fundraiser =new Fundraiser(0, '', '', '', '', '', true, 0,'');
  ngOnInit() {
    // 获取查询参数中的 ID
    this.route.queryParams.subscribe(params => {
      this.fundraiserId = params['id'];
      if (this.fundraiserId) {
        this.selectedFundraiser.FUNDRAISER_ID=this.fundraiserId;
        this.fundraiserService.getOneFundraiser(this.selectedFundraiser.FUNDRAISER_ID).subscribe((data) => {
          this.selectedFundraiser= data[0];
        });
      }
    });
  }

  public  updateFundraiser(): void {
    const newFundraiserData = {
      organizer: this.selectedFundraiser.ORGANIZER,
      caption: this.selectedFundraiser.CAPTION,
      targetFunding: this.selectedFundraiser.TARGET_FUNDING,
      city: this.selectedFundraiser.CITY,
      categoryId: this.selectedFundraiser.CATEGORY_ID,
      active:true};
    this.fundraiserService.updateFundraiser(this.selectedFundraiser.FUNDRAISER_ID,newFundraiserData).subscribe(() => {
      alert("Successfully updated!");
      this.router.navigate(['/admin']);  // 跳转回主页
    }, (error) => {
      console.error('Error adding fundraiser:', error);
      // 处理错误情况
    });
  }

}
