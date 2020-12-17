import { BehaviorSubject } from "rxjs";
import { mergeMap, filter } from "rxjs/operators";
import { User, Users, UserImpl} from "data/users"

export class UsersImpl implements Users {
  private _storage = [
    new UserImpl("1", "Guto"),
    new UserImpl("2", "Renato"),
    new UserImpl("3", "MSex"),
  ];
  private _list = new BehaviorSubject<User[]>(this._storage);

  constructor() {}

  public list() {
    return this._list;
  }

  public get(id: string) {
    return this._list.pipe(
      mergeMap((item) => item),
      filter((x) => x.id === id)
    );
  }
}

