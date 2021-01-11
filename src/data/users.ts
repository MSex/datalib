import { Observable } from "rxjs";

export type UserId = string;

export interface User {
  id: UserId;
  name: string;
}

export abstract class AUser {
  abstract id: UserId;
  abstract name: string;
}

export interface Users {
  create(user: User): Observable<UserId>;
  read(userId: UserId): Observable<User>;
  list(): Observable<User[]>;
  stream(): Observable<User>;
  update(userId: UserId, user: User): Observable<void>;
  delete(userId: UserId): Observable<void>;
}

export abstract class AUsers {
  abstract create(user: User): Observable<UserId>;
  abstract read(userId: UserId): Observable<User>;
  abstract list(): Observable<User[]>;
  abstract stream(): Observable<User>;
  abstract update(userId: UserId, user: User): Observable<void>;
  abstract delete(userId: UserId): Observable<void>;
}

export class UserImpl extends AUser implements User {
  constructor(public id: UserId, public name: string) {
    super();
  }
}
