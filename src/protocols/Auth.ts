export type SignUp = {
    picture: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type InsertUser = {
    picture?: string,
    name: string,
    email: string,
    passwordHash: string
}

export type SignIn = {
    email: string,
    password: string
}