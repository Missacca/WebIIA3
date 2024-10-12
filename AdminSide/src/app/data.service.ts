import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fundraiser} from "./models/fundraiser";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string = "http://localhost:8888/api";
  constructor(private http: HttpClient) {}

  /**
   * API START HERE
   */
  public getActiveFundraisers(): Observable<Fundraiser>{
    return this.http.get<Fundraiser>(this.url + "/getActiveFundraiser");
  }

  public addFundraiser(fundraiser: any): Observable<any> {
    return this.http.post(this.url+"/donation", fundraiser);
  }

  public updateFundraiser(id: string, fundraiser: any): Observable<any> {
    return this.http.put(`${this.url}/fundraiser/${id}`, fundraiser);
  }

  public  deleteFundraiser(id: string): Observable<any> {
    return this.http.delete(`${this.url}/deleteFundraiser/${id}`);
  }
}
