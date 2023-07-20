import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IresponsesignUp, ResponseData, Users } from '../../interface/common';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']

})
export class SignupComponent implements OnInit {

  public SignUpForm!: FormGroup;
  public submited: boolean = false;
  public loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authServiceService: AuthServiceService,
    private router: Router
  ) {
    this.singUpForm();
  }

  ngOnInit(): void {

  }

  singUpForm() {
    this.SignUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    })
  }

  get frmControl() {
    return this.SignUpForm.controls
  }

  signUp() {
    if (this.SignUpForm.invalid) {
      this.submited = true;
      this.loading = true;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all details' });
      this.loading = false;
      return
    }
    else {
      this.loading = true
      const data = {
        ...this.SignUpForm.value,
        role: 'student'
      }
      this.authServiceService.postUserdata(data).subscribe((res: IresponsesignUp) => {
        if (res && res.statusCode === 200) {
          this.SignUpForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User create successfully...' });
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.loading = false;
          }, 1500)
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'error', detail: res.message });
          this.SignUpForm.reset();
          this.loading = false;
        }
      })
    }
  }
}
