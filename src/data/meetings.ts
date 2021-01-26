import { Observable } from "rxjs";
import { JSONSchemaType } from "ajv";
import { UserId, userIdSchema } from "./users";

export type MeetingId = string;

export const meetingIdSchema: JSONSchemaType<UserId> = {
  type: "string",
  pattern: "[0-9]{4}",
};

export interface Meeting {
  id: MeetingId;
  description: string;
  password: string;
  speaker: UserId;
}

export const meetingSchema: JSONSchemaType<Meeting> = {
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern: "[0-9]{4}",
      nullable: true,
    },
    description: {
      type: "string",
      minLength: 10,
      maxLength: 100,
      nullable: true,
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 8,
      pattern: "/d+",
      nullable: true,
    },
    speaker: userIdSchema,
  },
  required: ["id", "description", "password", "speaker"] as never[],
  additionalProperties: false,
};

export interface Meetings {
  list(): Observable<Meeting[]>;
  stream(): Observable<Meeting>;
  get(id: MeetingId): Observable<Meeting>;
}

export class MeetingImpl implements Meeting {
  constructor(
    public id: MeetingId,
    public description: string,
    public password: string,
    public speaker: UserId,
  ) {}
}

