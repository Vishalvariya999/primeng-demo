export interface ResStudent {
    statusCode: number,
    message: string,
    data: ResStudentdata[],
    count: number
}

export interface ResStudentdata {
    status: string,
    _id: string,
    name: string,
    email: string
}

export interface ResViewstudent {
    statusCode: number,
    message: string,
    data: ResViewstudentData[]
}

export interface ResViewstudentData {
    _id: string,
    name: string,
    email: string,
    Result: ResResult[]
}

export interface ResResult {
    _id: string,
    studentAnswer: ResResultData[],
    rank: number,
    subjectName: string,
    score: number,
    studentId: string,
    resultStatus: string,
    __v: number
}

export interface ResResultData {
    question: string,
    answer: string
}

export interface ResExamCreate {
    statusCode: number,
    message: string,
    data: ResExamCreateData,
}

export interface ResExamCreateData {
    notes: string[],
    status: string,
    _id: string,
    subjectName: string,
    questions: ResExamQuestions[],
    email: string,
    __v: number
}

export interface ResExamQuestions {
    options: string[],
    _id: string,
    question: string,
    answer: string
}

export interface ResViewExam {
    statusCode: number,
    message: string,
    data: ResViewExamData[],
}

export interface ResViewExamData {
    notes: string[],
    _id: string,
    subjectName: string,
    email: string,
    __v: number
}

export interface Ibutton {
    class: string,
    label: string,
    icon?: string,
    id?: string
}