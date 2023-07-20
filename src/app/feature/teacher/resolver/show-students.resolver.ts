import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, of } from 'rxjs';
import { ResponseStudent } from '../../auth/interface/common';
import { TeacherServicesService } from '../services/teacher-services.service';

@Injectable({
  providedIn: 'root'
})
export class ShowStudentsResolver implements Resolve<boolean> {

  constructor(
    private teacherServicesService: TeacherServicesService,
    private ngxService: NgxUiLoaderService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.teacherServicesService.getStudents();
  }
}
