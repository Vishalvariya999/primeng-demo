import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examresponse, IeditStudentData, IgetExam, IgetstudentProfile } from '../interface/student-common';

@Injectable({
  providedIn: 'root'
})
export class StudentServicesService {

  private url = environment.baseUrl + `student/`;

  constructor(
    private http: HttpClient
  ) { }

  getAllExampaper(): Observable<Examresponse> {
    return this.http.get<Examresponse>(this.url + 'studentExam')
  }

  // getExampaper(queryParams: any) {
  //   return this.http.get(this.url + 'examPaper/', { params: queryParams });
  // }

  getExampaper(id: string): Observable<IgetExam> {
    return this.http.get<IgetExam>(this.url + `examPaper?id=${id}`);
  }

  giveExam(id: string, data: any): Observable<any> {
    return this.http.post<any>(this.url + `giveExam?id=${id}`, data);
  }

  getStudentProfile(): Observable<IgetstudentProfile> {
    return this.http.get<IgetstudentProfile>(this.url + 'getStudentDetail');
  }

  editStudentProfile(data: any): Observable<IeditStudentData> {
    return this.http.put<IeditStudentData>(this.url + 'studentProfile', data);
  }

}
