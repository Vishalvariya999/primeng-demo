import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ViewdataTableComponent } from 'src/app/shared/components/viewdata-table/viewdata-table.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';

import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { SidebarModule } from 'primeng/sidebar';
import { ViewExamComponent } from './components/view-exam/view-exam.component';
import { DropdownModule } from 'primeng/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExamViewDetailsComponent } from './components/exam-view-details/exam-view-details.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    DashboardTeacherComponent,
    AllStudentsComponent,
    ViewStudentComponent,
    CreateExamComponent,
    ViewExamComponent,
    ExamViewDetailsComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    HeaderComponent,
    ViewdataTableComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ChipsModule,
    RadioButtonModule,
    MultiSelectModule,
    ListboxModule,
    SidebarModule,
    DropdownModule,
    FontAwesomeModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class TeacherModule {

}
