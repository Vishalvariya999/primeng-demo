import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentServicesService } from '../../student/services/student-services.service';
import { TeacherServicesService } from '../../teacher/services/teacher-services.service';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuardGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {

  constructor(
    private router: Router,
    private teacherServicesService: TeacherServicesService,
    private studentServicesService: StudentServicesService,
    private authServiceService: AuthServiceService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let token = localStorage.getItem('access-token')
    // console.log('token :>> ', token);
    // if (token) {
    //   console.log('state:>> ', state)
    //   // this.router.navigate(['/teacher'])
    //   return false
    // }
    // // this.router.navigate(['/auth/login'])
    // return true
    // let role = localStorage.getItem('role')
    // if (role === 'student' && localStorage.getItem('access-token')) {
    //   this.router.navigate(['/student/dashboard'])
    //   return true
    // }
    // else if (role === 'teacher' && localStorage.getItem('access-token')) {
    //   this.router.navigate(['/teacher/dashboard'])
    //   return true
    // }
    // else {
    //   this.router.navigate(['/auth/login'])
    //   return true
    // }
    return true
  }


  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
