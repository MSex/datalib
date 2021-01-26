import { UsersValidationImpl } from "./users";
import { expectOnlyCompletion, expectOnlyError } from "../util/util";
describe("Users validation", () => {
    let target;
    beforeEach(() => {
        target = new UsersValidationImpl();
    });
    describe("Validates user for creation", () => {
        it("checks if user is no null", (done) => {
            target
                .validateCreate(null)
                .subscribe(expectOnlyError(done));
        });
        it("checks if user has name", (done) => {
            target
                .validateCreate({
                birth: "1977-05-24",
                login: "mauricio@example.com",
            })
                .subscribe(expectOnlyError(done));
        });
        it("checks if name is too short", (done) => {
            target
                .validateCreate({
                name: "abcd",
                birth: "1977-05-24",
                login: "mauricio@example.com",
            })
                .subscribe(expectOnlyError(done));
        });
        it("rejects if name is too long", (done) => {
            target
                .validateCreate({
                name: "abcd56789012345678901",
                birth: "1977-05-24",
                login: "mauricio@example.com",
            })
                .subscribe(expectOnlyError(done));
        });
        it("accept a not too short name", (done) => {
            target
                .validateCreate({
                name: "abaas",
                birth: "1977-05-24",
                login: "mauricio@example.com",
            })
                .subscribe(expectOnlyCompletion(done));
        });
        it("accept a not too long name", (done) => {
            target
                .validateCreate({
                name: "abcd5678901234567890",
                birth: "1977-05-24",
                login: "mauricio@example.com",
            })
                .subscribe(expectOnlyCompletion(done));
        });
    });
});
//# sourceMappingURL=users.spec.js.map