import { Observable } from "rxjs";

export type UserId = string;

export interface Plural<T> {
  get(id: UserId): Observable<T>;

  list(): Observable<T[]>;
}

export interface User {
  id: UserId;
  name: string;
}

export interface Users extends Plural<User> {
  get(id: UserId): Observable<User>;

  list(): Observable<User[]>;
}

export abstract class AUser {
  abstract id: UserId;
  abstract name: string;
}

export abstract class AUsers {
  abstract get(id: UserId): Observable<User>;

  abstract list(): Observable<User[]>;
}

export class UserImpl extends AUser implements User {
  constructor(public id: UserId, public name: string) {
    super();
  }
}
