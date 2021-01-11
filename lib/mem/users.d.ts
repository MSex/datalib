import { Observable } from "rxjs";
import { User, Users } from "../data/users";
export declare class UsersImpl implements Users {
    private _storage;
    private _list;
    list(): Observable<User[]>;
    get(id: string): Observable<User>;
}
//# sourceMappingURL=users.d.ts.map