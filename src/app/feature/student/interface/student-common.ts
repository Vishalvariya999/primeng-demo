export interface Examresponse {
    data: Examdata[],
    message: string,
    statusCode: number,
    userId: string,
}

export interface Examdata {
    _id: string,
    notes: string[],
    subjectName: string,
    email: string,
    Result: any[]
}

export interface IgetExam {
    statusCode: number,
    message: string,
    data: IgetExamData[]
}

export interface IgetExamData {
    options: string[],
    _id: string,
    question: string
}

export interface IgetstudentProfile {
    statusCode: number,
    message: string,
    data: {
        _id: string,
        name: string,
        email: string,
        role: string
    }
}

export interface IeditStudentData {
    statusCode: number,
    message: string,
    data: {
        name: string,
        email: string,
        id: string
    }
}