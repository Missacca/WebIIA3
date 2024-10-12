import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'A3-AdminSide';
  fundraisers: any[] = [];
  newFundraiser = { name: '', goal: 0, description: '' }; // 用于新增表单
  selectedFundraiser: any; // 用于更新表单
  donations: any[] = []; // 用于显示捐款信息

  constructor(private fundraiserService: FundraiserService) {}

  ngOnInit(): void {
    this.loadFundraisers();
  }

  loadFundraisers(): void {
    this.fundraiserService.getFundraisers().subscribe((data) => {
      this.fundraisers = data;
    });
  }

  saveFundraiser(): void {
    this.fundraiserService.addFundraiser(this.newFundraiser).subscribe(() => {
      this.loadFundraisers();
    });
  }

  updateFundraiser(): void {
    if (this.selectedFundraiser && this.selectedFundraiser.id) {
      this.fundraiserService.updateFundraiser(this.selectedFundraiser.id, this.selectedFundraiser).subscribe(() => {
        this.loadFundraisers();
      });
    }
  }

  deleteFundraiser(id: string): void {
    this.fundraiserService.deleteFundraiser(id).subscribe(() => {
      this.loadFundraisers();
    });
  }

  // 显示筹款的捐款信息
  showDonations(fundraiser: any): void {
    this.selectedFundraiser = fundraiser;
    this.donations = fundraiser.donations; // 假设捐款信息存储在筹款活动内
  }
}
