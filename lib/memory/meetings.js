import { of, from } from "rxjs";
import { filter } from "rxjs/operators";
import { MeetingImpl } from "../data/meetings";
export class MeetingsImpl {
    constructor() {
        this._storage = [
            new MeetingImpl("1", "Primeiro", "asdf", "1"),
            new MeetingImpl("2", "Segundo", "asdf", "2"),
            new MeetingImpl("3", "Terceiro", "asdf", "3"),
        ];
    }
    list() {
        return of(this._storage);
    }
    stream() {
        throw from(this._storage);
    }
    get(id) {
        return this.stream().pipe(filter((x) => x.id === id));
    }
}
//# sourceMappingURL=meetings.js.map