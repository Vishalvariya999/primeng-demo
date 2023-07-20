import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { TeacherServicesService } from '../../services/teacher-services.service';


@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {

  public display: boolean = false;
  public creatExamform!: FormGroup;
  public showError: boolean = false;
  public optionValue: any;
  public Heading: string = "Create Exam";
  public exBtn: string = "Submit Exam";
  public getExamId: any;
  public editData: any;


  constructor(
    private fb: FormBuilder,
    private teacherServicesService: TeacherServicesService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createExam();
    this.optionValue = [
      { option: 'Option 1', value: 'A' },
      { option: 'Option 2', value: 'B' },
      { option: 'Option 3', value: 'C' },
      { option: 'Option 4', value: 'D' }
    ];
  }

  ngOnInit(): void {
    this.getExamId = this.activatedRoute.snapshot.queryParams['id'];

    this.getExamDetails();
  }

  createExam() {
    this.creatExamform = this.fb.group({
      subjectName: ['', Validators.required],
      questions: this.fb.array([this.questionGroup()]),
      notes: ['', Validators.required]
    })
  }

  questionGroup() {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      options: this.fb.group({
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required]
      })
    })
  }

  get frmControl() {
    return this.creatExamform.controls;
  }

  get questionsAdd() {
    return (this.frmControl['questions'] as FormArray)
  }

  addQuestion() {
    if (this.creatExamform.invalid) {
      this.showError = true;
    }
    else {
      this.questionsAdd.push(this.questionGroup());
    }
  }

  submitExamPepar() {
    if (this.creatExamform.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all details' });
      return;
    }
    else if (this.exBtn === "Submit Exam") {
      let value = this.creatExamform.value;
      let sendData = {
        ...value,
        questions: value.questions.map((res: any) => {
          return {
            ...res,
            options: Object.values(res.options)
          }
        })
      }
      this.teacherServicesService.createExam(sendData).subscribe((res) => {
        this.creatExamform.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exam Create Successfully...' });
        this.router.navigate(['/teacher/dashboard/viewExam']);
      })
    }
    else if (this.exBtn === "Update") {
      let value = this.creatExamform.value;
      let data = {
        ...value,
        questions: value.questions.map((res: any) => {
          return {
            ...res,
            options: Object.values(res.options)
          }
        })
      }
      this.teacherServicesService.editExam(this.getExamId, data).subscribe((res: any) => {
        if (res) {
          this.creatExamform.reset();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit Exam Successfully...' });
          this.router.navigate(['/teacher/dashboard/viewExam']);
        }
      })
    }
  }

  getExamDetails() {
    if (this.getExamId) {
      this.Heading = "Update Exam"
      this.exBtn = "Update"
      this.teacherServicesService.viewExamDetails(this.getExamId).
        pipe(
          map((resData: any) => {
            if (resData) {
              this.editData = resData.data.questions.map((response: any) => {
                let examdata = {
                  ...response,
                  options: {
                    option1: response.options[0],
                    option2: response.options[1],
                    option3: response.options[2],
                    option4: response.options[3]
                  }
                }
                return examdata
              })
              this.editData.map((res: any, ind: any) => {
                if (res && ind) {
                  this.questionsAdd.push(this.questionGroup());
                }
              })
              return this.editData
            }
          })
        ).subscribe((res: any) => {
          this.creatExamform.patchValue({ questions: res });
        })
    }
  }
}
