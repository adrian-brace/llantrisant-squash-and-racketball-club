import { Component, OnInit } from '@angular/core';
import { FixturesService } from '../fixtures.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  fixtures: any = [];
  results: any = [];

  constructor(private fixturesService: FixturesService) { }

  ngOnInit() {
    // Retrieve fixtures from the API
    this.fixturesService.getAllFixtures().subscribe(fixtures => {
      this.fixtures = this.fixturesOnly(fixtures);
      this.results = this.resultsOnly(fixtures);
    });
  }

  getOptionsFor = function (propName, isFixtures) {
					
    var data;
    
    if (isFixtures){
      data = this.fixtures;
    } else {
      data = this.results;
    }
    
    return (data || []).map(function (f) {
      return f[propName];
    }).filter(function (f, idx, arr) {
      return arr.indexOf(f) === idx;
    });
  };

  fixturesOnly = function (items) {
    var filtered = [];
    if(typeof items !== 'undefined'){
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(item.date) >= today) {
          filtered.push(item);
        }
      }
    }
    return filtered;
  };
  
  resultsOnly = function (items) {
    var filtered = [];
    if(typeof items !== 'undefined'){
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(item.date) < today) {
          filtered.push(item);
        }
      }
    }
    return filtered;
  };
}
