import { Observable, of, from } from "rxjs";
import { filter } from "rxjs/operators";
import { Meeting, Meetings, MeetingImpl } from "../data/meetings";

export class MeetingsImpl implements     Meetings {
  private _storage = [
    new MeetingImpl("1", "Primeiro", "asdf", "1"),
    new MeetingImpl("2", "Segundo", "asdf", "2"),
    new MeetingImpl("3", "Terceiro", "asdf", "3"),
  ];
 
    public list(): Observable<Meeting[]> {
    return of(this._storage);
  }

  public stream(): Observable<Meeting> {
    throw from(this._storage);
  }

  public get(id: string): Observable<Meeting> {
    return this.stream().pipe(filter((x) => x.id === id));
  }
}
