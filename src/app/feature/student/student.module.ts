import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ShowExamComponent } from './components/show-exam/show-exam.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewdataTableComponent } from 'src/app/shared/components/viewdata-table/viewdata-table.component';
import { ExamPaperComponent } from './components/exam-paper/exam-paper.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    ShowExamComponent,
    ExamPaperComponent,
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    ViewdataTableComponent,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    DropdownModule,
    InputTextModule,
    ConfirmDialogModule,
    DialogModule,
    BreadcrumbModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class StudentModule { }
