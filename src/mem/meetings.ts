import { BehaviorSubject } from "rxjs";
import { mergeMap, filter } from "rxjs/operators";
import { Meeting, Meetings, MeetingImpl } from "../data/meetings";

export class MeetingsImpl implements Meetings {
  private _storage = [
    new MeetingImpl("1", "Primeiro", "asdf", "1"),
    new MeetingImpl("2", "Segundo", "asdf", "2"),
    new MeetingImpl("3", "Terceiro", "asdf", "3"),
  ];
  private _list = new BehaviorSubject<Meeting[]>(this._storage);

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
