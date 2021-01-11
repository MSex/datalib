import { Observable, of, from, throwError } from "rxjs";
import { filter, map, throwIfEmpty, toArray } from "rxjs/operators";
import { User, Users, UserImpl, UserId } from "../data/users";

const copyUser = (user: User): User => new UserImpl(user.id, user.name);

export class UsersImpl implements Users {
  private _storage = [new UserImpl("1", "Guto"), new UserImpl("2", "Renato"), new UserImpl("3", "MSex")];
  private _max = 3;

  public create(userData: User): Observable<UserId> {
    const userId = this._max++;

    const user = new UserImpl("" + userId, userData.name);

    this._storage.push(user);

    return of(user.id);
  }

  public read(userId: UserId): Observable<User> {
    return this.stream().pipe(
      filter((user) => user.id === userId),
      map(copyUser),
      throwIfEmpty(() => new Error("Not Found")),
    );
  }

  public list(): Observable<User[]> {
    return this.stream().pipe(toArray());
  }

  public stream(): Observable<User> {
    throw from(this._storage).pipe(map(copyUser));
  }

  public update(userId: UserId, userData: User): Observable<void> {
    return throwError(new Error("Not Implemented"));
  }

  public delete(userId: string): Observable<void> {
    return throwError(new Error("Not Implemented"));
  }
}
