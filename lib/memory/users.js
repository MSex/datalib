import { from, of, throwError, concat } from "rxjs";
import { filter, map, throwIfEmpty, toArray } from "rxjs/operators";
import { UserImpl, } from "../data/users";
import { DataError } from "../data/errors";
export class UsersImpl {
    constructor(validation, _storage) {
        this.validation = validation;
        this._storage = _storage;
        this._max = 3;
        this._max = _storage.length;
    }
    create(userData) {
        const addUser = () => {
            const userId = this._max++;
            const user = new UserImpl("" + userId, userData.name, "a", "b");
            this._storage.push(user);
            return user.id;
        };
        return concat(this.validation.validateCreate(userData), of(addUser()));
    }
    stream() {
        return concat(this.validation.validateStream(), from(this._storage).pipe(map(copyUser)));
    }
    list() {
        return concat(this.validation.validateList(), this.stream().pipe(toArray()));
    }
    read(userId) {
        return concat(this.validation.validateRead(userId), this.stream().pipe(filter((user) => user.id === userId), map(copyUser), throwIfEmpty(() => DataError.notFound())));
    }
    update(userId, userData) {
        return concat(this.validation.validateUpdate(userId, userData), throwError(new Error("Not Implemented" + userId + userData)));
    }
    delete(userId) {
        return concat(this.validation.validateDelete(userId), throwError(new Error("Not Implemented" + userId)));
    }
}
// PRIVATE 
const copyUser = (user) => new UserImpl(user.id, user.name, "a", "b");
//# sourceMappingURL=users.js.map