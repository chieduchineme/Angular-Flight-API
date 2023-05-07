import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetAirportsService {
  constructor(private http: HttpClient) {  }

  getArrivalData(ourAirport: string, beginDateString: number, endDateString: number): Observable<any> {
    return this.http
      .get(environment.openSkyUrl + `/arrival?airport=${ourAirport}&begin=${beginDateString}&end=${endDateString}`)
    .pipe(
      retry(3), catchError(this.handleError), shareReplay(1)
    )
  }

  getDepartureData(ourAirport: string, beginDateString: number, endDateString: number): Observable<any> {
    return this.http
      .get(environment.openSkyUrl + `/departure?airport=${ourAirport}&begin=${beginDateString}&end=${endDateString}`)
    .pipe(
      retry(3), catchError(this.handleError), shareReplay(1)
    )
  }

  getFlights(beginDateString: number, endDateString: number): Observable<any> {
    return this.http
      .get(environment.openSkyUrl + `/all?begin=${beginDateString}&end=${endDateString}`)
    .pipe(
      retry(3), catchError(this.handleError), shareReplay(1)
    )
  }

  handleError(error: string) {
    return throwError(() => new Error(error));
  }

}
