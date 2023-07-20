import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { StudentServicesService } from '../../services/student-services.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  public studentPro: any;
  public editMode: boolean = false;
  public editForm!: FormGroup;
  public changeData: any;
  public fetching: boolean = false;

  constructor(
    private studentServicesService: StudentServicesService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private ngxService: NgxUiLoaderService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getStudentProfile()
  }

  getStudentProfile() {
    this.ngxService.start()
    this.studentServicesService.getStudentProfile().subscribe((res: any) => {
      if (res && res.statusCode == 200) {
        this.studentPro = res.data
        this.ngxService.stop()

      }
      else if (res && res.statusCode == 401) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        this.ngxService.stop()
      }
    })
  }

  changeMode() {
    this.editMode = true;
    this.ngxService.start()
    this.editForm.patchValue({
      ...this.studentPro
    })
    this.ngxService.stop()
  }

  editData() {
    this.fetching = true
    let data = {
      ...this.editForm.value
    }
    this.studentServicesService.editStudentProfile(data).subscribe((res: any) => {
      if (res) {
        this.editMode = false
        this.studentPro = res.data
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.fetching = false
      }
    })
  }
}
