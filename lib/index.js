var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "inversify";
import "reflect-metadata";
import { BehaviorSubject } from "rxjs";
export const TYPES = {
    Pessoas: Symbol("Pessoas")
};
export class Pessoa {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
let PessoasImpl = class PessoasImpl {
    constructor() {
        this._storage = [
            new Pessoa(1, "MSex"),
            new Pessoa(2, "Guto"),
            new Pessoa(3, "Renato")
        ];
        this._list = new BehaviorSubject(this._storage);
    }
    list() {
        return this._list;
    }
    refresh() {
        this._list.next([]);
        this._list.next(this._storage);
    }
    add() {
        const n = this._storage.length + 1;
        this._storage.push(new Pessoa(n, "User" + n));
    }
};
PessoasImpl = __decorate([
    injectable()
], PessoasImpl);
export { PessoasImpl };
