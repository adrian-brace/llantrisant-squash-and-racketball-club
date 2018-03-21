import { Component, OnInit } from '@angular/core';
import { FixturesService } from '../fixtures.service';
import { SharedFunctions } from '../shared-functions';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {

  fixtures: any = [];
  results: any = [];
  direction: string = "+";
  orderColumn: string = "date";
  filter: any = {};
  year: number = 0;
  season: string = "";

  constructor(private fixturesService: FixturesService) { }

  ngOnInit() {

    this.year = SharedFunctions.getYear();
    this.season = SharedFunctions.getSeason();

    // Retrieve fixtures from the API
    this.fixturesService.getAllFixtures().subscribe(fixtures => {
      this.fixtures = this.fixturesOnly(fixtures);
      this.results = this.resultsOnly(fixtures);
    });
  }

  getOptionsFor = function (propName: string, isFixtures: boolean = true) {
					
    var data = [];
    
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

  fixturesOnly = function (items: any) {
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
  
  resultsOnly = function (items: any) {
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

  teamLetter = function(teamName: string) {
    if (!teamName || !teamName.length) {
      return;
    }
    else{
      return teamName.slice(-1);
    }
  }

  sort = function(column: string) {
		if (this.orderColumn === column) {
			this.direction = "-";
		} else {
			this.orderColumn = column;
			this.direction = "+";
		}
  };

  clearFilter = function() {
		this.filter = {};
	}
  
}
