import { concat, defer, EMPTY } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
const mapToUser = map((obj) => obj);
const mapToId = map((obj) => obj.id);
const mapToEmpty = mergeMap(() => EMPTY);
export class UsersImpl {
    constructor(validation, requestFactory, fetcher) {
        this.validation = validation;
        this.requestFactory = requestFactory;
        this.fetcher = fetcher;
    }
    list() {
        const validate = this.validation.validateList();
        const execute = this.stream().pipe(toArray());
        return concat(validate, execute);
        //TODO why thes cast?
    }
    stream() {
        const validate = this.validation.validateStream();
        const execute = defer(() => {
            const path = "/users";
            const init = { method: "GET" };
            const request = this.requestFactory.build(path, init);
            return this.fetcher.fetchBodyJsonLines(request).pipe(mapToUser);
        });
        return concat(validate, execute);
    }
    create(user) {
        const validate = this.validation.validateCreate(user);
        const execute = defer(() => {
            const path = "/users";
            const init = {
                method: "GET",
                body: JSON.stringify({
                    user: user,
                }),
            };
            const request = this.requestFactory.build(path, init);
            return this.fetcher.fetchBodyJson(request).pipe(mapToId);
        });
        return concat(validate, execute);
    }
    read(userId) {
        const validate = this.validation.validateRead(userId);
        const execute = defer(() => {
            const path = "/users/" + userId;
            const init = {
                method: "GET",
            };
            const request = this.requestFactory.build(path, init);
            return this.fetcher.fetchBodyJson(request).pipe(mapToUser);
        });
        return concat(validate, execute);
    }
    update(userId, user) {
        const validate = this.validation.validateUpdate(userId, user);
        const execute = defer(() => {
            const path = "/users/" + userId;
            const init = {
                method: "PUT",
                body: JSON.stringify({
                    user: user,
                }),
            };
            const request = this.requestFactory.build(path, init);
            return this.fetcher.fetch(request).pipe(mapToEmpty);
        });
        return concat(validate, execute);
    }
    delete(userId) {
        const validate = this.validation.validateDelete(userId);
        const execute = defer(() => {
            const path = "/users/" + userId;
            const init = {
                method: "DELETE",
            };
            const request = this.requestFactory.build(path, init);
            return this.fetcher.fetch(request).pipe(mapToEmpty);
        });
        return concat(validate, execute);
    }
}
//# sourceMappingURL=users.js.map