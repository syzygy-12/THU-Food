enum Authority {
    empty = 0,
    root = 1
}

export interface UserInfo {
    nickname: string
    avatar: string
    authority: Authority
}

export interface UserLoginResponse {
    valid: boolean
    id: number
    token: string
}