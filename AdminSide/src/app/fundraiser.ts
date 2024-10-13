export class Fundraiser {
  FUNDRAISER_ID: number;
  ORGANIZER: string;
  CAPTION : string;
  TARGET_FUNDING: string;
  CURRENT_FUNDING: string;
  CITY: string;
  ACTIVE: boolean;
  CATEGORY_ID: number;

  constructor(fundraiserId: number, organizer: string, caption: string, target_funding: string, current_funding: string, city: string, active: boolean, categoryId: number) {
    this.FUNDRAISER_ID = fundraiserId;
    this.ORGANIZER = organizer;
    this.CAPTION = caption;
    this.TARGET_FUNDING = target_funding;
    this.CURRENT_FUNDING = current_funding;
    this.CITY = city;
    this.ACTIVE = active;
    this.CATEGORY_ID = categoryId;
  }

}
