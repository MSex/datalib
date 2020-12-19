import { BehaviorSubject } from "rxjs";
import { Meeting, Meetings } from "../data/meetings";
export declare class MeetingsImpl implements Meetings {
    private _storage;
    private _list;
    constructor();
    list(): BehaviorSubject<Meeting[]>;
    get(id: string): import("rxjs").Observable<Meeting>;
}
//# sourceMappingURL=meetings.d.ts.map