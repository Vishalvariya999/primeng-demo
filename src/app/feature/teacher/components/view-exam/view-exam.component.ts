import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tableHeading } from 'src/app/feature/auth/interface/common';
import { TeacherServicesService } from '../../services/teacher-services.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Ibutton } from '../../interface/teacher-m-common';

@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.scss'],
})
export class ViewExamComponent implements OnInit {
  public responseExamData: any;
  public data: any;
  public cols: tableHeading[] = [
    { field: 'subjectName', header: 'Subject Name', filter: 'text' },
    { field: 'email', header: 'Email', filter: 'text' },
    { field: 'notes', header: 'Notes', filter: 'null' },
  ];

  public button: Ibutton[] = [
    {
      btnClass: 'btn btn-sm btn-primary m-1',
      label: 'View',
      class: 'pi pi-eye',
    },
    {
      btnClass: 'btn btn-sm btn-success m-1',
      label: 'Update',
      class: 'pi pi-pencil',
    },
    {
      btnClass: 'btn btn-sm btn-danger m-1',
      label: 'Delete',
      class: 'pi pi-trash',
    },
  ];

  constructor(
    private teacherServicesService: TeacherServicesService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.getExamData();
  }

  getExamData() {
    this.ngxService.start();
    this.teacherServicesService.viewExam().subscribe((res: any) => {
      this.responseExamData = res.data;
      this.ngxService.stop();
    });
  }

  getExamPepar(data: any) {
    switch (data.button) {
      case 'View':
        this.ngxService.start();
        this.router.navigate(['teacher/dashboard/viewExamDetails'], {
          queryParams: { id: data.data._id },
        });
        this.ngxService.stop();
        break;
      case 'Update':
        this.ngxService.start();
        this.router.navigate(['teacher/dashboard/updateExam'], {
          queryParams: { id: data.data._id },
        });
        this.ngxService.stop();
        break;
      case 'Delete':
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.teacherServicesService
              .deleteExam(data.data._id)
              .subscribe((res: any) => {
                if (res) {
                  this.responseExamData.splice(res._id, 1);
                  this.messageService.add({
                    severity: 'success',
                    detail: 'You have accepted',
                  });
                }
              });
          },
          reject: () => {
            this.messageService.add({
              severity: 'error',
              detail: 'You have rejected',
            });
          },
        });
        break;
      default:
        console.log('Not Found....');
    }
  }
}
