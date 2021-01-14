import { CompletionObserver, ErrorObserver } from "rxjs";

const notExpected = (done: DoneFn, message: string) => (value?: unknown) =>
  done.fail(new Error(message + (value ? " " + value : "")));
const runCallbackAndDone = (done: DoneFn, callback?: (e?: unknown) => void) => (
  e?: unknown,
) => {
  if (callback) callback(e);
  done();
};

export const expectOnlyError = (
  done: DoneFn,
  onError?: (err: unknown) => void,
): CompletionObserver<unknown> => {
  const o: CompletionObserver<unknown> = {
    next: notExpected(done, "should never emmit"),
    error: runCallbackAndDone(done, onError),
    complete: notExpected(done, "should never complete"),
  };

  return o;
};

export const expectOnlyCompletion = (
  done: DoneFn,
  onCompletion?: () => void,
): ErrorObserver<unknown> => {
  const o: ErrorObserver<unknown> = {
    next: notExpected(done, "should never emmit"),
    error: notExpected(done, "unexpected error:"),
    complete: runCallbackAndDone(done, onCompletion),
  };

  return o;
};

export const expectEmitionsAndCompletion = (
  done: DoneFn,
  onNext?: (value: unknown) => void,
  onCompletion?: () => void,
): CompletionObserver<unknown> => {
  const o: CompletionObserver<unknown> = {
    next: runCallbackAndDone(done, onNext),
    error: notExpected(done, "unexpected error:"),
    complete: runCallbackAndDone(done, onCompletion),
  };

  return o;
};
