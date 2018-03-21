import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { FixturesService } from './fixtures.service';
import { enableProdMode } from '@angular/core';
import { OrderBy } from "./pipes/orderBy.pipe";
import "../extension_methods/ArrayExtensions";
import "../extension_methods/NumberExtensions";
import "../extension_methods/StringExtensions";


// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'fixtures',
    pathMatch: 'full'
  },
  { 
    path: 'fixtures',
    component: FixturesComponent
  }
];

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    FixturesComponent,
    OrderBy
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [FixturesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
