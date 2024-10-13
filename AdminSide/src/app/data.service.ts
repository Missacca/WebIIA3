import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fundraiser} from "./fundraiser";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string = "http://localhost:8888/api";
  constructor(private http: HttpClient) {}

  /**
   * API START HERE
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
    return this.http.get<number>(`${this.url}/getLastFundraiserId`); // 你需要实现这个 API
  }

}
