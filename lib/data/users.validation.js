import { throwError, of } from "rxjs";
import Ajv from "ajv";
import { DataError } from "./errors";
import { newUserSchema, userIdSchema, updateUserSchema } from "./users";
import addFormats from "../../node_modules/ajv-formats/dist";
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
//# sourceMappingURL=users.validation.js.map