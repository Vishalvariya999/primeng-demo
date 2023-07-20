import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherServicesService } from 'src/app/feature/teacher/services/teacher-services.service';
import { StudentServicesService } from '../../services/student-services.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  public studentData: any;

  constructor(
    private studentServicesService: StudentServicesService
  ) { }


  ngOnInit(): void {

    this.studentServicesService.getStudentProfile().subscribe((res: any) => {
      this.studentData = res.data
      console.log('res.data :>> ', res.data);
    })
  }
}
