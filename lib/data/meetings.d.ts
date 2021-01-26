import { Observable } from "rxjs";
import { JSONSchemaType } from "ajv";
import { UserId } from "./users";
export declare type MeetingId = string;
export declare const meetingIdSchema: JSONSchemaType<UserId>;
export interface Meeting {
    id: MeetingId;
    description: string;
    password: string;
    speaker: UserId;
}
export declare const meetingSchema: JSONSchemaType<Meeting>;
export interface Meetings {
    list(): Observable<Meeting[]>;
    stream(): Observable<Meeting>;
    get(id: MeetingId): Observable<Meeting>;
}
export declare class MeetingImpl implements Meeting {
    id: MeetingId;
    description: string;
    password: string;
    speaker: UserId;
    constructor(id: MeetingId, description: string, password: string, speaker: UserId);
}
//# sourceMappingURL=meetings.d.ts.map