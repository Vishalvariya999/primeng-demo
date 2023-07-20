import { Component, Input, OnInit } from '@angular/core';
import { ResExamCreate, ResStudent } from '../../interface/teacher-m-common';
import { TeacherServicesService } from '../../services/teacher-services.service';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.scss']
})
export class DashboardTeacherComponent implements OnInit {

  public studentData!: number;
  public paperData!: number;
  constructor(
    private teacherServicesService: TeacherServicesService
  ) { }

  ngOnInit(): void {
    this.teacherServicesService.getStudents().subscribe((res: ResStudent) => {
      this.studentData = res.data.length
    })

    this.teacherServicesService.viewExam().subscribe((res: any) => {
      console.log('res :>> ', res);
      this.paperData = res.data.length
    })
  }

}
