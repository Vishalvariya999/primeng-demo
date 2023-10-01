import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { exhaustMap, fromEvent, shareReplay, take, tap } from 'rxjs';
import {
  IloginResponse,
  ResponseData,
  ResponseUser,
  Users,
} from '../../interface/common';
import { AuthServiceService } from '../../services/auth-service.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginForm!: FormGroup;
  public submited: boolean = false;
  public loading: boolean = false;

  @ViewChild('btnLogin') btnLogin!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authServiceService: AuthServiceService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private primeNGConfig: PrimeNGConfig
  ) {
    this.validationLogin();
  }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
    // if (localStorage.getItem('access-token') && localStorage.getItem('role') === 'student') {
    //   this.router.navigate(['/auth/login']);
    // }
    this.redirectAuth();
  }

  redirectAuth() {
    let role = localStorage.getItem('role');
    if (role === 'student' && localStorage.getItem('access-token')) {
      this.router.navigate(['/student/dashboard']);
    } else if (role === 'teacher' && localStorage.getItem('access-token')) {
      this.router.navigate(['/teacher/dashboard']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  ngAfterViewInit(): void {
    // fromEvent(this.btnLogin.nativeElement, 'click').pipe(
    //   exhaustMap(() => this.onLogin()!)
    // ).subscribe((res: any) => {
    //   console.log('res :>> ', res);
    // })
  }

  validationLogin() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  get frmControl() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.submited = true;
      this.loading = true;
      this.messageService.add({
        severity: 'error',
        detail: 'Please fill all details',
      });
      this.loading = false;
      return;
    } else {
      this.loading = true;
      let data = {
        ...this.loginForm.value,
      };
      this.authServiceService
        .logInPost(data)
        .subscribe((res: IloginResponse) => {
          if (res && res.statusCode === 200) {
            console.log('res.data :>> ', res.data);
            this.ngxService.start();
            this.loginForm.reset();
            this.ngxService.stop();
            this.messageService.add({
              severity: 'success',
              detail: res.message,
            });
            localStorage.setItem('access-token', res.data.token);
            localStorage.setItem('role', res.data.role);
            let getRole = localStorage.getItem('role');
            if (getRole === 'student') {
              this.router.navigate(['/student']);
              this.loading = false;
            } else {
              this.router.navigate(['/teacher']);
              this.loading = false;
            }
          } else {
            this.messageService.add({
              severity: 'error',
              detail: res.message,
            });
            this.loginForm.reset();
            this.loading = false;
          }
        });
    }
  }
}
