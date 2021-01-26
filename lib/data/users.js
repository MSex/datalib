import { throwError, of } from "rxjs";
import Ajv from "ajv";
import { DataError } from "./errors";
import addFormats from "ajv-formats";
export const userIdSchema = {
    type: "string",
    pattern: "[0-9]{4}",
};
export const userSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern: "[0-9]{4}",
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
export class UserImpl {
    constructor(id, name, login, birth) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.birth = birth;
    }
}
export class UsersValidationImpl {
    constructor() {
        //TODO preparar para injeção de dependencia
        this.ajv = new Ajv();
        addFormats(this.ajv);
        this.validateNewUser = this.ajv.compile(newUserSchema);
        this.validateUpdateUser = this.ajv.compile(updateUserSchema);
        this.validateUserId = this.ajv.compile(userIdSchema);
    }
    buildError(errors) {
        let msg = "";
        for (const err of errors) {
            msg += err.message;
        }
        return throwError(DataError.invalidRequest(msg));
    }
    validateCreate(user) {
        const validation = this.validateNewUser;
        if (!validation(user)) {
            return this.buildError(validation.errors);
        }
        return of();
    }
    validateRead(userId) {
        const validation = this.validateUserId;
        if (!validation(userId)) {
            return this.buildError(validation.errors);
        }
        return of();
    }
    validateList() {
        return of();
    }
    validateStream() {
        return of();
    }
    validateUpdate(userId, user) {
        const validation1 = this.validateUserId;
        if (!validation1(userId)) {
            return this.buildError(validation1.errors);
        }
        const validation2 = this.validateUpdateUser;
        if (!validation2(user)) {
            return this.buildError(validation2.errors);
        }
        return of();
    }
    validateDelete(userId) {
        const validation = this.validateUserId;
        if (!validation(userId)) {
            return this.buildError(validation.errors);
        }
        return of();
    }
}
//# sourceMappingURL=users.js.map