
export class JWTToken{
    token: string;
    role: string;
    userId: string;
    userName: string;
    constructor(token: string, role: string, userId: string, userName: string){
        this.token = token;
        this.role = role;
        this.userId = userId;
        this.userName = userName;
    }
}