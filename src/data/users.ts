import { Observable } from "rxjs";
import { JSONSchemaType } from "ajv";

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

export type TUser = {
  id: UserId;
  name: string;
  login: string;
  birth: string;
};

export const userSchema: JSONSchemaType<User> = {
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

export abstract class AUser {
  abstract id: UserId;
  abstract name: string;
}

export interface Users {
  create(user: NewUser): Observable<UserId>;
  read(userId: UserId): Observable<User>;
  list(): Observable<User[]>;
  stream(): Observable<User>;
  update(userId: UserId, user: User): Observable<never>;
  delete(userId: UserId): Observable<never>;
}

export abstract class AUsers {
  abstract create(user: User): Observable<UserId>;
  abstract read(userId: UserId): Observable<User>;
  abstract list(): Observable<User[]>;
  abstract stream(): Observable<User>;
  abstract update(userId: UserId, user: UpdateUser): Observable<void>;
  abstract delete(userId: UserId): Observable<void>;
}

export class UserImpl extends AUser implements User {
  constructor(
    public id: UserId,
    public name: string,
    public login: string,
    public birth: string,
  ) {
    super();
  }
}

//validation should return validation error? or error with code?
export interface UsersValidation {
  validateCreate(user: NewUser): Observable<never>;
  validateRead(userId: UserId): Observable<never>;
  validateList(): Observable<never>;
  validateStream(): Observable<never>;
  validateUpdate(userId: UserId, user: UpdateUser): Observable<never>;
  validateDelete(userId: UserId): Observable<never>;
}
