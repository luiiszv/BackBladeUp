

export interface ILoginReq {
    email: string,
    password: string
}

export interface ILoginRes {
    email: string,
    password: string,
    token: string
}