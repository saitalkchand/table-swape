import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MainService {

  constructor(private http:Http) { }

  getServiceData() {
    return this.http.get('https://api.myjson.com/bins/1a2mnp');
  }
}
