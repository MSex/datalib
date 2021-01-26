import { Observable } from "rxjs";
import { Meeting, Meetings } from "../data/meetings";
export declare class MeetingsImpl implements Meetings {
    private _storage;
    list(): Observable<Meeting[]>;
    stream(): Observable<Meeting>;
    get(id: string): Observable<Meeting>;
}
//# sourceMappingURL=meetings.d.ts.map