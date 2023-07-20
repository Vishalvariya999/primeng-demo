import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TeacherGuardGuard } from '../auth/authguards/teacher-guard.guard';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { ExamViewDetailsComponent } from './components/exam-view-details/exam-view-details.component';
import { ViewExamComponent } from './components/view-exam/view-exam.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { ShowStudentsResolver } from './resolver/show-students.resolver';
import { StudentDetailsResolver } from './resolver/student-details.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: DashboardTeacherComponent
      },
      {
        path: 'allStudent',
        canDeactivate: [TeacherGuardGuard],
        component: AllStudentsComponent,
        resolve: {
          studentList: ShowStudentsResolver
        }
      },
      {
        path: 'viewStudentDetails/:id',
        component: ViewStudentComponent,
        canDeactivate: [TeacherGuardGuard],
        resolve: {
          id: StudentDetailsResolver
        }
      },
      {
        path: 'createExam',
        canDeactivate: [TeacherGuardGuard],
        component: CreateExamComponent
      },
      {
        path: 'updateExam',
        canDeactivate: [TeacherGuardGuard],
        component: CreateExamComponent
      },
      {
        path: 'viewExam',
        component: ViewExamComponent
      },
      {
        path: 'viewExamDetails',
        canDeactivate: [TeacherGuardGuard],
        component: ExamViewDetailsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
