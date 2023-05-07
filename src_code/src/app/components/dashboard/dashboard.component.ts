import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAirportsService } from 'src/app/services/get-airports.service';
import { GetAirportsListService } from 'src/app/shared-services/get-airports-list.service';
import { DateService } from 'src/app/shared-services/date.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
   flightsFilter!: FormGroup;

   departureCount = 0; // counts of arriving and departing flights for selected airport
   arrivalCount = 0;
   ourArrivalCount! : number ;  // convert from Number to number for any visualization library
   ourDepartureCount! : number ;

   ourAirports: Array<string> = []; // list of airports in the time range selected
   ourAirport = '';

   loading = false;

   beginDate = new Date().toISOString().substring(0, 16); // date format that the input understands
   endDate = new Date().toISOString().substring(0, 16);
   normalBeginDate = '';  // date format that the users understand or good for user experience
   normalEndDate = '';
   beginDateString : number = 1517227200;  // date format that the openSky endpoint understands
   endDateString = 1517230800;

   displayError: any;
   displayedErrorMessage: any; // error message if any
   ourNewDate = new Date().toISOString().substring(0, 16);

  constructor(
    private _formBuilder: FormBuilder,
    private getAirportsServ : GetAirportsService,
    private getAirportsListServ : GetAirportsListService,
    private dateServ : DateService 
    ) { }

  ngOnInit() {
    this.flightsFilter = this._formBuilder.group({
      startDate: [ Date , Validators.required],
      endDate: [ Date, Validators.required],
      airport: ['']
    })
 
    this.getAirportsServ.getFlights(this.beginDateString, this.endDateString)
      .subscribe({
        next: (flights) => {
        this.ourAirports = this.getAirportsListServ.setAllAirports(flights)},
        error: (error) => {this.displayedErrorMessage = error}
      });
    this.getMinBeginDate(this.endDate)

  }
  
  startDateChanged(theBeginDateString: Date) {
    this.beginDate = theBeginDateString.toString();
    const beginDateObj = new Date(theBeginDateString);
    this.normalBeginDate = beginDateObj.toString();
    const beginDateTime = Math.round(beginDateObj.getTime() / 1000).toString();
    this.beginDateString = Number(beginDateTime);
  }

  getArrivalAndDepartureCounts() {
    this.getAirportsServ.getArrivalData(this.ourAirport, this.beginDateString, this.endDateString)
      .subscribe({
        next: (flights) => {
          this.arrivalCount = flights.length;
        this.ourArrivalCount = this.arrivalCount.valueOf();  // convert from Number to number for any visualization library
        console.log(this.arrivalCount)
        },
        error: (error) => {this.displayedErrorMessage = error}
      });
    this.getAirportsServ.getDepartureData(this.ourAirport, this.beginDateString, this.endDateString)
      .subscribe({
        next: (flights) => {
          this.departureCount = flights.length;
          this.ourDepartureCount = this.departureCount.valueOf();
        },
        error: (error) => {this.displayedErrorMessage = error}
      });
  }

  endDateChanged(theEndDateString: Date) {    
    this.endDate = theEndDateString.toString();
    const endDateObj = new Date(theEndDateString);
    this.normalEndDate = endDateObj.toString();
    const endDateTime = Math.round(endDateObj.getTime() / 1000).toString();
    this.endDateString = Number(endDateTime);
  }

  handleSelectChange(event: MatSelectChange) {
    this.ourAirport = event.value;
    this.getArrivalAndDepartureCounts();
    // this.ourArrivalCount = this.arrivalCount.valueOf();  // convert from Number to number for any visualization library
    // this.ourDepartureCount = this.departureCount.valueOf();
    console.log(this.arrivalCount)
  }

  getMinBeginDate(endDate: string) {
    return this.dateServ.getMinBeginDate(endDate)
  }

  closeAlert() {
    this.displayError = false;
  }
}
