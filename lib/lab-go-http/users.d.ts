import { Observable } from "rxjs";
import { User, Users, UsersValidation, NewUser, UserId } from "../data/users";
import { Fetcher, RequestFactory } from "./http";
export declare class UsersImpl implements Users {
    private validation;
    private requestFactory;
    private fetcher;
    constructor(validation: UsersValidation, requestFactory: RequestFactory, fetcher: Fetcher);
    list(): Observable<User[]>;
    stream(): Observable<User>;
    create(user: NewUser): Observable<UserId>;
    read(userId: string): Observable<User>;
    update(userId: string, user: User): Observable<never>;
    delete(userId: string): Observable<never>;
}
//# sourceMappingURL=users.d.ts.map