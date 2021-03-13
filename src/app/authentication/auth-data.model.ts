export interface AuthData{
    user_email:String;
    user_password:String;
}
export interface RegisterUser{
    user_first_name:String;
    user_last_name:String;
    user_email:String;
    user_password:String;
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