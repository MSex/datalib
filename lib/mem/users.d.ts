import { BehaviorSubject } from "rxjs";
import { User, Users } from "../data/users";
export declare class UsersImpl implements Users {
    private _storage;
    private _list;
    constructor();
    list(): BehaviorSubject<User[]>;
    get(id: string): import("rxjs").Observable<User>;
}
//# sourceMappingURL=users.d.ts.map