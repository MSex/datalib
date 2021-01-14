/// <reference types="jasmine" />
import { CompletionObserver, ErrorObserver } from "rxjs";
export declare const expectOnlyError: (done: DoneFn, onError?: ((err: unknown) => void) | undefined) => CompletionObserver<unknown>;
export declare const expectOnlyCompletion: (done: DoneFn, onCompletion?: (() => void) | undefined) => ErrorObserver<unknown>;
export declare const expectEmitionsAndCompletion: (done: DoneFn, onNext?: ((value: unknown) => void) | undefined, onCompletion?: (() => void) | undefined) => CompletionObserver<unknown>;
//# sourceMappingURL=util.d.ts.map