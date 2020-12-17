import { BehaviorSubject } from "rxjs";
import { mergeMap, filter } from "rxjs/operators";
import { UserImpl } from "../data/users";
export class UsersImpl {
    constructor() {
        this._storage = [
            new UserImpl("1", "Guto"),
            new UserImpl("2", "Renato"),
            new UserImpl("3", "MSex"),
        ];
        this._list = new BehaviorSubject(this._storage);
    }
    list() {
        return this._list;
    }
    get(id) {
        return this._list.pipe(mergeMap((item) => item), filter((x) => x.id === id));
    }
}
//# sourceMappingURL=users.js.map