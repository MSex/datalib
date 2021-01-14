import { Observable } from "rxjs";
import { NewUser, UpdateUser, UsersValidation } from "./users";
export declare class UsersValidationImpl implements UsersValidation {
    private ajv;
    private validateNewUser;
    private validateUpdateUser;
    private validateUserId;
    constructor();
    private buildError;
    validateCreate(user: NewUser): Observable<never>;
    validateRead(userId: string): Observable<never>;
    validateList(): Observable<never>;
    validateStream(): Observable<never>;
    validateUpdate(userId: string, user: UpdateUser): Observable<never>;
    validateDelete(userId: string): Observable<never>;
}
//# sourceMappingURL=users.validation.d.ts.map