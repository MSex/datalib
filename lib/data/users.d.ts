import { Observable } from "rxjs";
import { JSONSchemaType } from "ajv";
export declare type UserId = string;
export declare const userIdSchema: JSONSchemaType<UserId>;
export interface User {
    id: UserId;
    name: string;
    login: string;
    birth: string;
}
export declare type TUser = {
    id: UserId;
    name: string;
    login: string;
    birth: string;
};
export declare const userSchema: JSONSchemaType<User>;
export interface NewUser {
    name: string;
    login: string;
    birth: string;
}
export declare const newUserSchema: JSONSchemaType<NewUser>;
export interface UpdateUser {
    name: string;
    birth: string;
}
export declare const updateUserSchema: JSONSchemaType<UpdateUser>;
export declare abstract class AUser {
    abstract id: UserId;
    abstract name: string;
}
export interface Users {
    create(user: NewUser): Observable<UserId>;
    read(userId: UserId): Observable<User>;
    list(): Observable<User[]>;
    stream(): Observable<User>;
    update(userId: UserId, user: User): Observable<never>;
    delete(userId: UserId): Observable<never>;
}
export declare abstract class AUsers {
    abstract create(user: User): Observable<UserId>;
    abstract read(userId: UserId): Observable<User>;
    abstract list(): Observable<User[]>;
    abstract stream(): Observable<User>;
    abstract update(userId: UserId, user: UpdateUser): Observable<void>;
    abstract delete(userId: UserId): Observable<void>;
}
export declare class UserImpl extends AUser implements User {
    id: UserId;
    name: string;
    login: string;
    birth: string;
    constructor(id: UserId, name: string, login: string, birth: string);
}
export interface UsersValidation {
    validateCreate(user: NewUser): Observable<never>;
    validateRead(userId: UserId): Observable<never>;
    validateList(): Observable<never>;
    validateStream(): Observable<never>;
    validateUpdate(userId: UserId, user: UpdateUser): Observable<never>;
    validateDelete(userId: UserId): Observable<never>;
}
//# sourceMappingURL=users.d.ts.map