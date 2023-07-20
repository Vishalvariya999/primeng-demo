import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResExamCreate, ResResult, ResResultData, ResStudent, ResViewExam, ResViewstudent } from '../interface/teacher-m-common';

@Injectable({
  providedIn: 'root'
})
export class TeacherServicesService {
  private url = environment.baseUrl + `dashboard/Teachers`;
  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) { }

  getStudents(): Observable<ResStudent> {
    return this.http.get<ResStudent>(this.url);
  }

  getViewStudent(queryParams: any): Observable<ResViewstudent> {
    return this.http.get<ResViewstudent>(this.url + '/viewStudentDetail/', { params: queryParams });
  }

  createExam(data: any): Observable<ResExamCreate> {
    return this.http.post<ResExamCreate>(this.url + '/Exam', data);
  }

  viewExam(): Observable<ResViewExam> {
    return this.http.get<ResViewExam>(this.url + '/viewExam');
  }

  // viewExamDetails(queryParams: any): Observable<any> {
  //   return this.http.get<any>(this.url + '/examDetail/', { params: queryParams })
  // }

  viewExamDetails(id: any): Observable<any> {
    return this.http.get<any>(this.url + `/examDetail?id=${id}`)
  }

  editExam(id: any, data: any) {
    return this.http.put(this.url + `/editExam/?id=${id}`, data)
  }

  deleteExam(id: string): Observable<any> {
    return this.http.delete<any>(this.url + '/deleteExam?id=' + id)
  }

} 
