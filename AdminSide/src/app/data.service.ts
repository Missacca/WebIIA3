import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fundraiser} from "../models/fundraiser";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string = "http://localhost:8080/api";
  constructor(private http: HttpClient) {}

  /**
   * API START HERE
   */
  public getActiveFundraisers(): Observable<Fundraiser>{
    return this.http.get<Fundraiser>(this.url + "/getActiveFundraiser");
  }
}
