import { Injectable } from '@angular/core';

interface MyDict {
  [x: string | number]: any;
}

@Injectable({
  providedIn: 'root'
})
export class GetAirportsListService {

  count: MyDict = {};  // list of arriving flights for all airports
  countDep: MyDict = {};  // list of departure flights for all airports
  combinedCount: MyDict = {};  // joined list of arriving and departing flights for all airports

  constructor() { }

  getArrivalAirportList(flights: any) {
    if (flights) {
      const estArrivalAirports = flights.map((flight: any) => flight.estArrivalAirport);
      estArrivalAirports.forEach((element: number) => {
        if (this.count[element]) {
          this.count[element] += 1;
        } else {
          this.count[element] = 1;
        }
      });
    }
  }

  getDepartureAirportList(flights: any) {
    if (flights) {
      const estDepartureAirports = flights.map((flight: any) => flight.estDepartureAirport);
      estDepartureAirports.forEach((element: number) => {
        if (this.countDep[element]) {
          this.countDep[element] += 1;
        } else {
          this.countDep[element] = 1;
        }
      });
  }}

  setAllAirports(flights:any) {
    this.getArrivalAirportList(flights);
    this.getDepartureAirportList(flights);
    if(this.count != null && this.countDep != null) {
      for (const key of Object.keys(this.count)) {
        if (this.countDep && key in this.countDep) {
          this.combinedCount[key] = {
            estArrivalAirport: this.count[key],
            estDepartureAirport: this.countDep[key]
          };
        } else {
          this.combinedCount[key] = {
            estArrivalAirport: this.count[key],
            estDepartureAirport: 0
          };
        }
      }
      if (this.countDep) {
        for (const key of Object.keys(this.countDep)) {
          if (!(key in this.count)) {
            this.combinedCount[key] = {
              estArrivalAirport: 0,
              estDepartureAirport: this.countDep[key]
            };
          }
        }
      }
      }
    const allAirports = Object.keys(this.combinedCount).filter(item => item !== "null");  
    return allAirports;
  }
}
