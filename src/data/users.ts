import { JSONSchemaType } from "ajv";
import { Observable, throwError, of } from "rxjs";
import Ajv, { DefinedError, ValidateFunction } from "ajv";
import { DataError } from "./errors";
import addFormats from "ajv-formats";

export type UserId = string;

export const userIdSchema: JSONSchemaType<UserId> = {
  type: "string",
  pattern: "[0-9]{4}",
};

export interface User {
  id: UserId;
  name: string;
  login: string;
  birth: string;
}

export const userSchema: JSONSchemaType<User> = {
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
  required: ["id", "birth", "login", "name"] as never[],
  additionalProperties: false,
};

export interface NewUser {
  name: string;
  login: string;
  birth: string;
}

export const newUserSchema: JSONSchemaType<NewUser> = {
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
  required: ["birth", "login", "name"] as never[],
  additionalProperties: false,
};

export interface UpdateUser {
  name: string;
  birth: string;
}

export const updateUserSchema: JSONSchemaType<UpdateUser> = {
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
  required: ["birth", "name"] as never[],
  additionalProperties: false,
};

export interface Users {
  create(user: NewUser): Observable<UserId>;
  read(userId: UserId): Observable<User>;
  list(): Observable<User[]>;
  stream(): Observable<User>;
  update(userId: UserId, user: User): Observable<never>;
  delete(userId: UserId): Observable<never>;
}

export interface UsersValidation {
  validateCreate(user: NewUser): Observable<never>;
  validateRead(userId: UserId): Observable<never>;
  validateList(): Observable<never>;
  validateStream(): Observable<never>;
  validateUpdate(userId: UserId, user: UpdateUser): Observable<never>;
  validateDelete(userId: UserId): Observable<never>;
}

export class UserImpl implements User {
  constructor(
    public id: UserId,
    public name: string,
    public login: string,
    public birth: string,
  ) {}
}

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
