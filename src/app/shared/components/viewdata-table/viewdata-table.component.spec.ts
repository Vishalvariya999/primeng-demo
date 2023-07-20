import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdataTableComponent } from './viewdata-table.component';

describe('ViewdataTableComponent', () => {
  let component: ViewdataTableComponent;
  let fixture: ComponentFixture<ViewdataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ViewdataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewdataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
