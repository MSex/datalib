import { injectable } from "inversify";
import "reflect-metadata";
import { BehaviorSubject, Observable } from "rxjs";

export const TYPES = {
  Pessoas: Symbol("Pessoas")
};

export interface Pessoas {
  list(): Observable<Pessoa[]>;
  add(): void;
  refresh(): void;
}

export class Pessoa {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@injectable()
export class PessoasImpl implements Pessoas {
  private _storage = [
    new Pessoa(1, "MSex"),
    new Pessoa(2, "Guto"),
    new Pessoa(3, "Renato")
  ];
  private _list = new BehaviorSubject<Pessoa[]>(this._storage);

  public list() {
    return this._list;
  }

  public refresh() {
    this._list.next([]);
    this._list.next(this._storage);
  }

  public add() {
    const n = this._storage.length + 1;
    this._storage.push(new Pessoa(n, "User" + n));
  }
}
