import { Observable } from "rxjs";
export declare type UserId = string;
export interface Plural<T> {
    get(id: UserId): Observable<T>;
    list(): Observable<T[]>;
}
export interface User {
    id: UserId;
    name: string;
}
export interface Users extends Plural<User> {
    get(id: UserId): Observable<User>;
    list(): Observable<User[]>;
}
export declare abstract class AUser {
    abstract id: UserId;
    abstract name: string;
}
export declare abstract class AUsers {
    abstract get(id: UserId): Observable<User>;
    abstract list(): Observable<User[]>;
}
export declare class UserImpl extends AUser implements User {
    id: UserId;
    name: string;
    constructor(id: UserId, name: string);
}
//# sourceMappingURL=users.d.ts.map