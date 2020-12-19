import { BehaviorSubject } from "rxjs";
import { mergeMap, filter } from "rxjs/operators";
import { MeetingImpl } from "../data/meetings";
export class MeetingsImpl {
    constructor() {
        this._storage = [
            new MeetingImpl("1", "Primeiro", "asdf", "1"),
            new MeetingImpl("2", "Segundo", "asdf", "2"),
            new MeetingImpl("3", "Terceiro", "asdf", "3"),
        ];
        this._list = new BehaviorSubject(this._storage);
    }
    list() {
        return this._list;
    }
    get(id) {
        return this._list.pipe(mergeMap((item) => item), filter((x) => x.id === id));
    }
}
//# sourceMappingURL=meetings.js.map