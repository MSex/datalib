import { Meeting, Meetings } from "../data/meetings";
import { Observable } from "rxjs";
export declare class MeetingsImpl implements Meetings {
    private _storage;
    private _list;
    list(): Observable<Meeting[]>;
    get(id: string): Observable<Meeting>;
}
//# sourceMappingURL=meetings.d.ts.map