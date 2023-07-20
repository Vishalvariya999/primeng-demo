import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tableHeading } from 'src/app/feature/auth/interface/common';
import { Examresponse } from '../../interface/student-common';
import { StudentServicesService } from '../../services/student-services.service';

@Component({
  selector: 'app-show-exam',
  templateUrl: './show-exam.component.html',
  styleUrls: ['./show-exam.component.scss']
})
export class ShowExamComponent implements OnInit {

  public examData!: any;
  public display: boolean = false;
  public resultData: any;
  public cols: tableHeading[] = [
    { field: 'subjectName', header: 'Subject Name', filter: 'text' },
    { field: 'email', header: 'Email', filter: 'text' }
  ];
  public button: any = [
    { class: 'btn btn-md m-1 btn-primary', label: 'View', id: 'view' },
    { class: 'btn btn-md m-1 btn-success', label: 'Result', id: 'result' }
  ]


  constructor(
    private studentServicesService: StudentServicesService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.showExampaper()
  }


  showExampaper() {
    this.ngxService.start()
    this.studentServicesService.getAllExampaper().subscribe((res: Examresponse) => {
      this.ngxService.stop()
      if (res && res.statusCode === 200) {
        this.examData = res.data

      }
      else if (res && res.statusCode === 401) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        this.ngxService.stop()
      }
    })
  }

  getData(data: any) {
    switch (data.button) {
      case 'View':
        this.router.navigate(['student/dashboard/examPaper'], { queryParams: { id: data.data._id } });

        break;
      case 'Result':
        this.display = true;
        let resultVal = data.data.Result
        console.log('resultVal :>> ', resultVal);
        this.resultData = resultVal
        if (resultVal.length === 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "You have not given Exam" });
        }
        break;
    }
  }
}
