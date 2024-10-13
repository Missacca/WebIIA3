import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Fundraiser } from "./models/fundraiser";
import { Category } from "./models/category";
import { Donation } from "./models/donation";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  /* Set up URL to connect to REST API Server */
  private url: string = 'http://localhost:8888/api';
  constructor(private http: HttpClient) { }

  /**
   * Get Active Fundraisers
   * @return {*} {Observable<Fundraiser>}
   * @memberOf DataService
   */
  public getActiveFundraiser():Observable<Fundraiser> {
    return this.http.get<Fundraiser>(this.url + '/getActiveFundraiser');
  }
  /**
   *  Get All Categories
   *  @return {*} {Observable<Category>}
   *  @memberOf DataService
   */
  public getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/getCategory');
  }
  public searchFundraiser(organizer?: string, city?: string, category?: string): Observable<Fundraiser[]> {
    let params = new HttpParams();

    if (organizer) {
      params = params.append('organizer', organizer);
    }
    if (city) {
      params = params.append('city', city);
    }
    if (category) {
      params = params.append('category',category);
    }
    return this.http.get<Fundraiser[]>(`${this.url}/searchFundraiser`, { params });
  }
  public getFundraiserById(id:number) :Observable<Fundraiser>{
    return this.http.get<Fundraiser>(`${this.url}/getFundraiserById/${id}`);
  }
  public CreateDonation(donation:any):Observable<any>{
    return this.http.post<Observable<any>>(this.url + '/donation',donation);
  }
  public getDonations(id:number):Observable<Donation> {
    return this.http.get<Donation>(`${this.url}/getDonation/${id}`);
  }

}
