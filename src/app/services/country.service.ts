import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {country} from "../interfaces/country";
import {HttpClient} from "@angular/common/http";
import {CoatOfArms} from "../interfaces/coat-of-arms";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<country[]> {
    return this.httpClient.get<country[]>('https://restcountries.com/v2/all');
  }

  getCoatOfArms(numericCode: string): Observable<CoatOfArms[]>{
    return this.httpClient.get<CoatOfArms[]>('https://restcountries.com/v3.1/alpha/'+numericCode);
  }
}
