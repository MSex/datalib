import { NewUser, Users, UsersValidation } from "../data/users";
import { UsersImpl } from "./users";
import { Fetcher, RequestFactory } from "./http";
import { expectEmitionsAndCompletion, expectOnlyError } from "../util/util";
import { of, throwError } from "rxjs";
import { DataError } from "../data/errors";

//TODO test coverage
describe("Users", () => {
  let validation: jasmine.SpyObj<UsersValidation>;
  let fetcher: jasmine.SpyObj<Fetcher>;
  let requestFactory: jasmine.SpyObj<RequestFactory>;

  let target: Users;

  beforeEach(() => {
    validation = jasmine.createSpyObj<UsersValidation>([
      "validateCreate",
      "validateRead",
      "validateList",
      "validateStream",
      "validateUpdate",
      "validateDelete",
    ]);

    fetcher = jasmine.createSpyObj<Fetcher>([
      "fetch",
      "fetchBodyJson",
      "fetchBodyText",
      "fetchBodyLines",
      "fetchBodyJsonLines",
    ]);

    requestFactory = jasmine.createSpyObj<RequestFactory>(["build"]);

    target = new UsersImpl(validation, requestFactory, fetcher);
  });

  describe(".create()", () => {
    it("fails when validation fails", (done) => {
      const err = DataError.invalidRequest();
      validation.validateCreate.and.returnValue(throwError(err));

      target.create((null as unknown) as NewUser).subscribe(
        //TODO use expect tobe idiom
        expectOnlyError(done, (e) => {
          expect(e).toBe(err);
        }),
      );
    });

    it("fails when fetch fails", (done) => {
      //Choose a proper error
      const err = DataError.invalidRequest();
      validation.validateCreate.and.returnValue(of());
      fetcher.fetchBodyJson.and.returnValue(throwError(err));

      target.create((null as unknown) as NewUser).subscribe(
        //TODO use expect tobe idiom
        expectOnlyError(done, (e) => {
          //todo testar se dá pra tirar pra fora do obs
          expect(validation.validateCreate).toHaveBeenCalled();
          expect(e).toBe(err);
        }),
      );
    });

    it("parses body ok", (done) => {
      //Choose a proper error
      validation.validateCreate.and.returnValue(of());
      fetcher.fetchBodyJson.and.returnValue(of({ id: "1234" }));
      const newUser: NewUser = {
        name: "a",
        login: "b",
        birth: "c",
      };

      target.create(newUser).subscribe(
        //TODO use expect().toBe() idiom
        expectEmitionsAndCompletion(
          done,
          (v) => {
            expect(v).toBe("1234");
          },
          () => {
            expect(validation.validateCreate).toHaveBeenCalled();
            expect(fetcher.fetchBodyJson).toHaveBeenCalled();
          },
        ),
      );
    });
  });
});
