import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  getMinBeginDate(endDate: string) {
    const maxStartDate = new Date(endDate);
    maxStartDate.setDate(maxStartDate.getDate() - 7);
    const setMaxDate = maxStartDate.toISOString().substring(0, 16);
    return setMaxDate;    
  }
}
