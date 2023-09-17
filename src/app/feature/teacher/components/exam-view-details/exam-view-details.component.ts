import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherServicesService } from '../../services/teacher-services.service';

@Component({
  selector: 'app-exam-view-details',
  templateUrl: './exam-view-details.component.html',
  styleUrls: ['./exam-view-details.component.scss'],
})
export class ExamViewDetailsComponent implements OnInit {
  public getId!: string;
  public questionsData: any;
  constructor(
    private teacherServicesService: TeacherServicesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getExamData();
  }

  getExamData() {
    this.getId = this.activatedRoute.snapshot.queryParams['id'];
    this.teacherServicesService
      .viewExamDetails(this.getId)
      .subscribe((res: any) => {
        if (res) {
          this.questionsData = res.data.questions;
        }
      });
  }
}
