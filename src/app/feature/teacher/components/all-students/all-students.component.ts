import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { tableHeading, tableStatus } from 'src/app/feature/auth/interface/common';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {

  public responsStudentData!: any;
  public studId!: string;
  public statuses: tableStatus[] = [
    { label: "Active", value: "Active" },
    { label: "Pending", value: "Pending" },
  ];
  public cols: tableHeading[] = [
    { field: 'name', header: 'Name', filter: 'text', },
    { field: 'email', header: 'Email', filter: 'text', },
    { field: 'status', header: 'Status', filter: 'dropDown', },
    // { field: 'null', header: 'Operation', filter: 'null' },
  ];

  public button: any = [
    { class: 'btn btn-md btn-primary', label: 'View', id: 'View' }
  ]

  public getRowData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.ngxService.start();
    if (localStorage.getItem('role') === 'teacher') {
      this.responsStudentData = this.activatedRoute.snapshot.data['studentList'].data
      this.ngxService.stop();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Teacher can Access only' });
    }
  }

  getData(data: any) {
    if (data.data._id) {
      this.router.navigate([`teacher/dashboard/viewStudentDetails/${data.data._id}`]);
    }
  }

}
