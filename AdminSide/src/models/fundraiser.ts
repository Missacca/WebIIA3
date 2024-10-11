export class Fundraiser {
  fundraiserId: number;
  organizer: string;
  caption: string;
  target_funding: string;
  current_funding: string;
  city: string;
  active: boolean;
  categoryId: number;

  constructor(fundraiserId: number, organizer: string, caption: string, target_funding: string, current_funding: string, city: string, active: boolean, categoryId: number) {
    this.fundraiserId = fundraiserId;
    this.organizer = organizer;
    this.caption = caption;
    this.target_funding = target_funding;
    this.current_funding = current_funding;
    this.city = city;
    this.active = active;
    this.categoryId = categoryId;
  }
}
