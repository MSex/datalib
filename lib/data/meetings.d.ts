import { Observable } from "rxjs";
import { UserId } from "../data/users";
export declare type MeetingId = string;
export interface Meeting {
    id: MeetingId;
    description: string;
    password: string;
    speaker: UserId;
}
export interface Meetings {
    list(): Observable<Meeting[]>;
    stream(): Observable<Meeting>;
    get(id: MeetingId): Observable<Meeting>;
}
export declare abstract class AMeeting implements Meeting {
    abstract id: MeetingId;
    abstract description: string;
    abstract password: string;
    abstract speaker: UserId;
}
export declare abstract class AMeetings {
    abstract get(id: MeetingId): Observable<Meeting>;
    abstract stream(): Observable<Meeting>;
    abstract list(): Observable<Meeting[]>;
}
export declare class MeetingImpl extends AMeeting implements Meeting {
    id: MeetingId;
    description: string;
    password: string;
    speaker: UserId;
    constructor(id: MeetingId, description: string, password: string, speaker: UserId);
}
//# sourceMappingURL=meetings.d.ts.map