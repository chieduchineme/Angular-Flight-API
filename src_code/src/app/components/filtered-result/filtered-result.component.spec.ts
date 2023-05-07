import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredResultComponent } from './filtered-result.component';

describe('FilteredResultComponent', () => {
  let component: FilteredResultComponent;
  let fixture: ComponentFixture<FilteredResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
