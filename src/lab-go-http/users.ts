import { Observable, of, from } from "rxjs";
import { filter } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { User, Users, UserImpl } from "../data/users";

export interface RequestFactory {
  build(path: string): Request;
}

export abstract class ARequestFactory {
  abstract build(path: string): Request;
}

export class UsersImpl implements Users {
  constructor(private requestFactory: RequestFactory) {}

  public list(): Observable<User[]> {
    const request = this.requestFactory.build("/users");

    return fromFetch(request).pipe(map((response) => response.read));
  }
}
