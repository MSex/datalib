export const userIdSchema = {
    type: "string",
    pattern: "[0-9]{4}",
};
export const userSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            nullable: true,
        },
        birth: {
            type: "string",
            format: "date",
            nullable: true,
        },
        login: {
            type: "string",
            minLength: 7,
            maxLength: 50,
            format: "email",
            nullable: true,
        },
        name: {
            type: "string",
            minLength: 5,
            maxLength: 20,
            nullable: true,
        },
    },
    required: ["id", "birth", "login", "name"],
    additionalProperties: false,
};
export const newUserSchema = {
    type: "object",
    properties: {
        birth: {
            type: "string",
            format: "date",
            nullable: true,
        },
        login: {
            type: "string",
            minLength: 7,
            maxLength: 50,
            format: "email",
            nullable: true,
        },
        name: {
            type: "string",
            minLength: 5,
            maxLength: 20,
            nullable: true,
        },
    },
    required: ["birth", "login", "name"],
    additionalProperties: false,
};
export const updateUserSchema = {
    type: "object",
    properties: {
        birth: {
            type: "string",
            format: "date",
            nullable: true,
        },
        name: {
            type: "string",
            minLength: 5,
            maxLength: 20,
            nullable: true,
        },
    },
    required: ["birth", "name"],
    additionalProperties: false,
};
export class AUser {
}
export class AUsers {
}
export class UserImpl extends AUser {
    constructor(id, name, login, birth) {
        super();
        this.id = id;
        this.name = name;
        this.login = login;
        this.birth = birth;
    }
}
//# sourceMappingURL=users.js.map