import { JSONSchemaType } from "ajv";
import { Observable } from "rxjs";
export declare type UserId = string;
export declare const userIdSchema: JSONSchemaType<UserId>;
export interface User {
    id: UserId;
    name: string;
    login: string;
    birth: string;
}
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
export interface Users {
    create(user: NewUser): Observable<UserId>;
    read(userId: UserId): Observable<User>;
    list(): Observable<User[]>;
    stream(): Observable<User>;
    update(userId: UserId, user: User): Observable<never>;
    delete(userId: UserId): Observable<never>;
}
export interface UsersValidation {
    validateCreate(user: NewUser): Observable<never>;
    validateRead(userId: UserId): Observable<never>;
    validateList(): Observable<never>;
    validateStream(): Observable<never>;
    validateUpdate(userId: UserId, user: UpdateUser): Observable<never>;
    validateDelete(userId: UserId): Observable<never>;
}
export declare class UserImpl implements User {
    id: UserId;
    name: string;
    login: string;
    birth: string;
    constructor(id: UserId, name: string, login: string, birth: string);
}
export declare class UsersValidationImpl implements UsersValidation {
    private ajv;
    private validateNewUser;
    private validateUpdateUser;
    private validateUserId;
    constructor();
    private buildError;
    validateCreate(user: NewUser): Observable<never>;
    validateRead(userId: string): Observable<never>;
    validateList(): Observable<never>;
    validateStream(): Observable<never>;
    validateUpdate(userId: string, user: UpdateUser): Observable<never>;
    validateDelete(userId: string): Observable<never>;
}
//# sourceMappingURL=users.d.ts.map