export class AuthenticationClass {
    public token: string;
    public refreshToken:string;
    public user_id: number;
}

export class RootObject {
    public Response: string;
    public Result: AuthenticationClass[];
    public Error: string;
}