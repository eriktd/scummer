export interface AuthObj {
    token: string,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        role: string
    }
}
