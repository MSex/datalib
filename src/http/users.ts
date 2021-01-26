import { Observable, concat, defer, EMPTY } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { User, Users, UsersValidation, NewUser, UserId } from "../data/users";
import { Fetcher, RequestFactory } from "./http";

export class UsersImpl implements Users {
  constructor(
    private validation: UsersValidation,
    private requestFactory: RequestFactory,
    private fetcher: Fetcher,
  ) {}

  public list(): Observable<User[]> {
    const validate = this.validation.validateList();
    const execute = this.stream().pipe(toArray<User>());

    return concat(validate, execute) as Observable<User[]>;
    //TODO why thes cast?
  }

  public stream(): Observable<User> {
    const validate = this.validation.validateStream();
    const execute = defer(() => {
      const path = "/users";
      const init = { method: "GET" };
      const request = this.requestFactory.build(path, init);
      return this.fetcher.fetchBodyJsonLines(request).pipe(mapToUser);
    });

    return concat(validate, execute) as Observable<User>;
  }

  create(user: NewUser): Observable<UserId> {
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

    return concat(validate, execute) as Observable<UserId>;
  }

  read(userId: string): Observable<User> {
    const validate = this.validation.validateRead(userId);
    const execute = defer(() => {
      const path = "/users/" + userId;
      const init = {
        method: "GET",
      };
      const request = this.requestFactory.build(path, init);
      return this.fetcher.fetchBodyJson(request).pipe(mapToUser);
    });

    return concat(validate, execute) as Observable<User>;
  }

  update(userId: string, user: User): Observable<never> {
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

    return concat(validate, execute) as Observable<never>;
  }

  delete(userId: string): Observable<never> {
    const validate = this.validation.validateDelete(userId);
    const execute = defer(() => {
      const path = "/users/" + userId;
      const init = {
        method: "DELETE",
      };
      const request = this.requestFactory.build(path, init);

      return this.fetcher.fetch(request).pipe(mapToEmpty);
    });

    return concat(validate, execute) as Observable<never>;
  }
}

// PRIVATE
const mapToUser = map((obj): User => obj as User);
const mapToId = map((obj): UserId => (obj as { id: string }).id as UserId);
const mapToEmpty = mergeMap((): Observable<never> => EMPTY);

