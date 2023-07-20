import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { StudentServicesService } from '../../services/student-services.service';


@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.scss']
})
export class ExamPaperComponent implements OnInit {

  public getId!: string;
  public questionsData: any;
  public examMode: boolean = false;
  public answerForm!: FormGroup;
  public editData: any;
  public options: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentServicesService: StudentServicesService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
    this.submitForm()
  }

  ngOnInit(): void {
    this.getExamData()
  }

  submitForm() {
    this.answerForm = this.fb.group({
      questions: this.fb.array([this.sendGroup()])
    })
  }

  sendGroup() {
    return this.fb.group({
      _id: ['', Validators.required],
      answer: ['', Validators.required],
      question: ['', Validators.required]
    })
  }

  get frmControl() {
    return this.answerForm.controls;
  }

  get questionsAdd() {
    return (this.frmControl['questions'] as FormArray)
  }

  getExamData() {
    this.getId = this.activatedRoute.snapshot.queryParams['id'];
    this.studentServicesService.getExampaper(this.getId).
      pipe(
        map((resData: any) => {
          if (resData) {
            this.editData = resData.data.map((response: any) => {
              let examdata = {
                ...response
              }
              return examdata
            })
            this.editData.map((res: any, ind: any) => {
              if (res && ind) {
                this.questionsAdd.push(this.sendGroup());
              }
            })
            return this.editData
          }
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.options = res
          console.log('this.options :>> ', this.options);
          this.answerForm.patchValue(
            { questions: res }
          )
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
        }
      })
  }

  changeMode() {
    this.confirmationService.confirm({
      message: 'Are you sure start the exam now ?',
      accept: () => {
        this.examMode = true
        this.messageService.add({ severity: 'success', summary: 'Accepceted', detail: 'You have Accepceted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  submiteExam() {
    this.confirmationService.confirm({
      message: 'Are you sure submite the exam ?',
      accept: () => {
        let data = {
          ...this.answerForm.value,
          questions: this.answerForm.value.questions.map((resData: any) => {
            return {
              question: resData._id,
              answer: resData.answer
            }
          })
        }
        this.studentServicesService.giveExam(this.getId, data.questions).subscribe((res: any) => {
          if (res) {
            this.router.navigate(['student/dashboard/showExam']);
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Your response is recorded' });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    })

  }
}
