import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Iforget, IresponseForget } from '../../interface/common';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public forgetPassForm!: FormGroup;
  public submited: boolean = false;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authServiceService: AuthServiceService,
    private router: Router
  ) {
    this.forgetVali();
  }

  ngOnInit(): void { }

  forgetVali() {
    this.forgetPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  get frmControl() {
    return this.forgetPassForm.controls
  }

  onForgetPassword() {
    if (this.forgetPassForm.invalid) {
      this.submited = true;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all details' });
      return;
    }
    else {
      this.authServiceService.postForgetPass(this.forgetPassForm.value).subscribe((res: any) => {
      })
      this.forgetPassForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Send request successfully...' });
    }
  }

  onChangePage() {
    this.router.navigate(['/auth'])
  }
}
