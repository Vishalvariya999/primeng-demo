export interface Users {
    name: string,
    email: string,
    password: string,
    role: string
}
export interface ResponseUser {
    data: ResponseData,
    message: string,
    statusCode: number
}

export interface ResponseData {
    email: string,
    id: string,
    name: string,
    role: string
}

export interface IresponsesignUp {
    data: ResponseData,
    message: string,
    statusCode: number
}

export interface PostLogin {
    email: string,
    password: string
}

export interface IloginResponse {
    data: IResponseloginData,
    message: string,
    statusCode: number
}

export interface IResponseloginData {
    email: string,
    name: string,
    role: string,
    token: string,
}

export interface Iforget {
    email: string
}

export interface IresponseForget {
    data: [],
    message: string,
    statusCode: number
}
export interface Inavitem {
    data: string,
    link: string,
    id: string,
    breadCrumbs?: string
}

export interface tableStatus {
    label: string,
    value: string
}

export interface tableHeading {
    field?: string,
    header: string,
    filter: string
}
export interface ResponseStudent {
    data: ResponseStudentData,
    message: string,
    statusCode: string,
    count: number
}

export interface ResponseStudentData {
    status: string,
    _id: string,
    name: string,
    email: string
}