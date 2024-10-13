export class Donation{
  DONATION_ID: number;
  DATE: string;
  AMOUNT: number;
  GIVER: string;
  FUNDRAISER_ID: number;
  constructor(donationId: number, date: string, amount: number, giver: string, fundraiserId: number) {
    this.DONATION_ID = donationId;
    this.DATE = date;
    this.AMOUNT = amount;
    this.GIVER = giver;
    this.FUNDRAISER_ID = fundraiserId;
  }
}
