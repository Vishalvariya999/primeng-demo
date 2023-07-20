import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamViewDetailsComponent } from './exam-view-details.component';

describe('ExamViewDetailsComponent', () => {
  let component: ExamViewDetailsComponent;
  let fixture: ComponentFixture<ExamViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamViewDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
