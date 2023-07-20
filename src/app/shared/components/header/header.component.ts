import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { Inavitem } from 'src/app/feature/auth/interface/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    BreadcrumbModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  public faPowerOff = faPowerOff;
  public faUser = faUser
  public navbar!: Inavitem[];

  ngOnInit(): void {
    if (localStorage.getItem('role') === 'teacher') {
      this.navbar = [
        {
          data: 'Students',
          link: '/teacher/dashboard/allStudent',
          id: 'showStudents'
        },
        {
          data: 'Create Exam',
          link: '/teacher/dashboard/createExam',
          id: 'createExam'
        },
        {
          data: 'View Exam',
          link: '/teacher/dashboard/viewExam',
          id: 'viewExam'
        }
      ]
    }
    else {
      this.navbar = [
        {
          data: 'Show Profile',
          link: '/student/dashboard/showProfile',
          id: 'showProfile',
        },
        {
          data: 'Show Exam',
          link: '/student/dashboard/showExam',
          id: 'showExam'
        }
      ]
    }


  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  reloadPage() {
    location.reload()
  }
}
