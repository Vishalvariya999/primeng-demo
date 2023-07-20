import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { StudentGuardGuard } from '../auth/authguards/student-guard.guard';
import { ExamPaperComponent } from './components/exam-paper/exam-paper.component';
import { ShowExamComponent } from './components/show-exam/show-exam.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

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
        component: StudentDashboardComponent
      },
      {
        path: 'showExam',
        component: ShowExamComponent
      },
      {
        path: 'examPaper',
        component: ExamPaperComponent
      },
      {
        path: 'showProfile',
        canDeactivate: [StudentGuardGuard],
        component: StudentProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
