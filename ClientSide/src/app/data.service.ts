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
  private url: string = '/api';
  // private url: string = 'http://localhost:8888/api';
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
  public searchFundraiser(active:number, organizer?: string, city?: string, category?: string): Observable<Fundraiser[]> {
    let params = new HttpParams();
    params = params.append('active',active)
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

  /**
   *  ADMIN API START HERE
   */
  public getAllFundraisers(): Observable<Fundraiser[]>{
    return this.http.get<Fundraiser[]>(this.url + "/getAllFundraiser");
  }

  public getOneFundraiser(id: number):Observable<Fundraiser[]>{
    return this.http.get<Fundraiser[]>(`${this.url}/fundraiser/${id}`);
  }
  public addFundraiser(fundraiser: any): Observable<Fundraiser> {
    return this.http.post<any>(this.url+"/fundraiser", fundraiser);
  }

  public updateFundraiser(id: number, fundraiser: any): Observable<any> {
    return this.http.put(`${this.url}/fundraiser/${id}`, fundraiser);
  }

  public  deleteFundraiser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteFundraiser/${id}`, { responseType: 'text' });
  }
  public  getLastFundraiserId(): Observable<number> {
    return this.http.get<number>(`${this.url}/getLastFundraiserId`);
  }
}
