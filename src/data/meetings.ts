import { Observable } from "rxjs";
import { UserId } from "data/users";

export type MeetingId = string;

export interface Meeting {
  id: MeetingId;
  description: string;
  password: string;
  speaker: UserId;
}

export interface Meetings {
  get(id: MeetingId): Observable<Meeting>;

  list(): Observable<Meeting[]>;
}

export abstract class AMeeting implements Meeting {
  abstract id: MeetingId;
  abstract description: string;
  abstract password: string;
  abstract speaker: UserId;
}

export abstract class AMeetings {
  abstract get(id: MeetingId): Observable<Meeting>;

  abstract list(): Observable<Meeting[]>;
}

export class MeetingImpl extends AMeeting implements Meeting {
  constructor(
    public id: MeetingId,
    public description: string,
    public password: string,
    public speaker: UserId
  ) {
    super();
  }
}
