import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentGuardGuard } from './feature/auth/authguards/student-guard.guard';
import { TeacherGuardGuard } from './feature/auth/authguards/teacher-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'teacher',
    canLoad: [TeacherGuardGuard],
    loadChildren: () => import('src/app/feature/teacher/teacher.module').then(m => m.TeacherModule)
  },
  {
    path: 'student',
    canLoad: [StudentGuardGuard],
    loadChildren: () => import('src/app/feature/student/student.module').then(m => m.StudentModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
