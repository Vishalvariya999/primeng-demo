import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeacherServicesService } from '../services/teacher-services.service';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsResolver implements Resolve<boolean> {
  public getId: any;
  constructor(
    private teacherServicesService: TeacherServicesService,
    private activatedRoute: ActivatedRoute

  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.getId = route.paramMap.get('id')
    return this.teacherServicesService.getViewStudent(this.getId);
  }
}
