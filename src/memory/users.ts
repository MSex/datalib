import { Observable, from, of, throwError, concat } from "rxjs";
import { filter, map, throwIfEmpty, toArray } from "rxjs/operators";
import {
  NewUser,
  User,
  UpdateUser,
  Users,
  UserImpl,
  UserId,
  UsersValidation,
} from "../data/users";
import { DataError } from "../data/errors";

export class UsersImpl implements Users {
  private _max = 3;

  constructor(private validation: UsersValidation, private _storage: User[]) {
    this._max = _storage.length;
  }

  public create(userData: NewUser): Observable<UserId> {
    const addUser = (): string => {
      const userId = this._max++;
      const user = new UserImpl("" + userId, userData.name, "a", "b");
      this._storage.push(user);

      return user.id;
    };

    return concat(this.validation.validateCreate(userData), of(addUser()));
  }

  public stream(): Observable<User> {
    return concat(
      this.validation.validateStream(),
      from(this._storage).pipe(map(copyUser)),
    );
  }

  public list(): Observable<User[]> {
    return concat(
      this.validation.validateList(),
      this.stream().pipe(toArray()),
    );
  }

  public read(userId: UserId): Observable<User> {
    return concat(
      this.validation.validateRead(userId),
      this.stream().pipe(
        filter((user) => user.id === userId),
        map(copyUser),
        throwIfEmpty(() => DataError.notFound()),
      ),
    );
  }

  public update(userId: UserId, userData: UpdateUser): Observable<never> {
    return concat(
      this.validation.validateUpdate(userId, userData),
      throwError(new Error("Not Implemented" + userId + userData)),
    );
  }

  public delete(userId: string): Observable<never> {
    return concat(
      this.validation.validateDelete(userId),
      throwError(new Error("Not Implemented" + userId)),
    );
  }
}

// PRIVATE 
const copyUser = (user: User): User =>
  new UserImpl(user.id, user.name, "a", "b");

