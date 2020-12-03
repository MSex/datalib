import "reflect-metadata";
import { BehaviorSubject, Observable } from "rxjs";
export declare const TYPES: {
    Pessoas: symbol;
};
export interface Pessoas {
    list(): Observable<Pessoa[]>;
    add(): void;
    refresh(): void;
}
export declare class Pessoa {
    id: number;
    name: string;
    constructor(id: number, name: string);
}
export declare class PessoasImpl implements Pessoas {
    private _storage;
    private _list;
    list(): BehaviorSubject<Pessoa[]>;
    refresh(): void;
    add(): void;
}
