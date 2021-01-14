import { Observable } from "rxjs";
import { NewUser, User, UpdateUser, Users, UserId, UsersValidation } from "../data/users";
export declare class UsersImpl implements Users {
    private validation;
    private _storage;
    private _max;
    constructor(validation: UsersValidation, _storage: User[]);
    create(userData: NewUser): Observable<UserId>;
    stream(): Observable<User>;
    list(): Observable<User[]>;
    read(userId: UserId): Observable<User>;
    update(userId: UserId, userData: UpdateUser): Observable<never>;
    delete(userId: string): Observable<never>;
}
//# sourceMappingURL=users.d.ts.map