export interface AuthData{
    email:String;
    password:String;
}
export interface RequestData {
    email: string;
    request:string;
    authorization: any;
}
export interface EmailCheck {
    request:String;
    email:String;
}
export interface changePassword {
    password:String;
    login_id:String;
    login_email:String;
    authorization: any;
}
export interface changeUsername {
    username:String;
    login_id:String;
    login_email:String;
    authorization: any;
}
export interface UserOne {
    role_id:string;
    login_id: string;
    authorization: any;
}