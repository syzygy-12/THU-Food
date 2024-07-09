export interface User {
    id: number
    name: string
    icon: string
}

export interface UserLoginResponse {
    valid: boolean
    id: number
}