import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FixturesService {

  constructor(private http: Http) { }

  // Get all fixtures from the API
  getAllFixtures() {
    return this.http.get('/api/fixtures')
      .map(res => res.json());
  }
}
