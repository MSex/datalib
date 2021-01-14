import { Observable, throwError, of } from "rxjs";
import Ajv, { DefinedError, ValidateFunction } from "ajv";
import { DataError } from "./errors";
import { NewUser, newUserSchema, UserId, userIdSchema, UpdateUser, updateUserSchema, UsersValidation } from "./users";
import addFormats from "../../node_modules/ajv-formats/dist";

export class UsersValidationImpl implements UsersValidation {
  private ajv: Ajv;
  private validateNewUser: ValidateFunction<NewUser>;
  private validateUpdateUser: ValidateFunction<UpdateUser>;
  private validateUserId: ValidateFunction<UserId>;

  constructor() {
    //TODO preparar para injeção de dependencia
    this.ajv = new Ajv();
    addFormats(this.ajv);
    this.validateNewUser = this.ajv.compile(newUserSchema);
    this.validateUpdateUser = this.ajv.compile(updateUserSchema);
    this.validateUserId = this.ajv.compile(userIdSchema);
  }

  private buildError(errors: DefinedError[]): Observable<never> {
    let msg = "";
    for (const err of errors as DefinedError[]) {
      msg += err.message;
    }
    return throwError(DataError.invalidRequest(msg));
  }

  validateCreate(user: NewUser): Observable<never> {
    const validation = this.validateNewUser;
    if (!validation(user)) {
      return this.buildError(validation.errors as DefinedError[]);
    }

    return of();
  }

  validateRead(userId: string): Observable<never> {
    const validation = this.validateUserId;
    if (!validation(userId)) {
      return this.buildError(validation.errors as DefinedError[]);
    }

    return of();
  }

  validateList(): Observable<never> {
    return of();
  }

  validateStream(): Observable<never> {
    return of();
  }

  validateUpdate(userId: string, user: UpdateUser): Observable<never> {
    const validation1 = this.validateUserId;
    if (!validation1(userId)) {
      return this.buildError(validation1.errors as DefinedError[]);
    }

    const validation2 = this.validateUpdateUser;
    if (!validation2(user)) {
      return this.buildError(validation2.errors as DefinedError[]);
    }

    return of();
  }

  validateDelete(userId: string): Observable<never> {
    const validation = this.validateUserId;
    if (!validation(userId)) {
      return this.buildError(validation.errors as DefinedError[]);
    }

    return of();
  }
}
