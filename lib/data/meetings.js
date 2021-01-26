import { userIdSchema } from "./users";
export const meetingIdSchema = {
    type: "string",
    pattern: "[0-9]{4}",
};
export const meetingSchema = {
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
    required: ["id", "description", "password", "speaker"],
    additionalProperties: false,
};
export class MeetingImpl {
    constructor(id, description, password, speaker) {
        this.id = id;
        this.description = description;
        this.password = password;
        this.speaker = speaker;
    }
}
//# sourceMappingURL=meetings.js.map