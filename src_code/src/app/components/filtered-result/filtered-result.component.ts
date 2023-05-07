import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'filtered-result',
  templateUrl: './filtered-result.component.html',
  styleUrls: ['./filtered-result.component.scss']
})
export class FilteredResultComponent implements OnInit {
  @Input() loading!: boolean;
  @Input() ourAirport! : string;
  @Input() normalBeginDate !: string;
  @Input() normalEndDate !: string;
  @Input() arrivalCount !: Number;
  @Input() departureCount !: Number; 
  constructor() { }

  ngOnInit(): void {
  }

}
