import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ResponseStudentData,
  tableHeading,
  tableStatus,
} from 'src/app/feature/auth/interface/common';
import { Ibutton } from 'src/app/feature/teacher/interface/teacher-m-common';

@Component({
  selector: 'app-viewdata-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    DropdownModule,
    BadgeModule,
    ButtonModule,
    PaginatorModule,
    FontAwesomeModule,
  ],
  templateUrl: './viewdata-table.component.html',
  styleUrls: ['./viewdata-table.component.scss'],
})
export class ViewdataTableComponent implements OnInit, AfterViewInit {
  @Input() tableData!: ResponseStudentData[];
  @Input() columns!: tableHeading[];
  @Input() status!: tableStatus[];
  @Input() isAction: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() buttons!: Ibutton[];
  @Input() badgeShow: boolean = false;

  @Output() studentId = new EventEmitter<string>();
  @Output() examId = new EventEmitter<string>();
  @Output() rowData = new EventEmitter<any>();
  @Output() buttonEvent = new EventEmitter<any>();

  public filterData: boolean = true;

  constructor(private router: Router, private ngxService: NgxUiLoaderService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {}, 5000);
  }

  onChange() {
    this.ngxService.start();
    this.router.navigate(['/teacher/dashboard']);
    this.ngxService.stop();
  }

  onClick(id: string) {
    this.studentId.emit(id);
  }

  getDeleteExam(id: string) {
    this.examId.emit(id);
  }

  onBtnClick(data: any, label: string) {
    const value = {
      data: data,
      button: label,
    };
    this.rowData.emit(value);
  }
}
