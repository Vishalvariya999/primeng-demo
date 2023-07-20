import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TeacherServicesService } from '../../services/teacher-services.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  public getId: any;
  public student: any;
  public result: boolean = false;
  public faArrowCircleLeft = faArrowCircleLeft
  constructor(
    private teacherServicesService: TeacherServicesService,
    private activatedRoute: ActivatedRoute,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }

  getDetails() {
    this.ngxService.start()
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')
    let queryParams = new HttpParams().append('id', this.getId);
    this.ngxService.stop()
    this.teacherServicesService.getViewStudent(queryParams).subscribe((res: any) => {
      if (res) {
        this.student = res.data[0]

      }
    })
  }

  showResult() {
    this.result = true;
  }
}
