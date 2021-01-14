const notExpected = (done, message) => (value) => done.fail(new Error(message + (value ? " " + value : "")));
const runCallbackAndDone = (done, callback) => (e) => {
    if (callback)
        callback(e);
    done();
};
export const expectOnlyError = (done, onError) => {
    const o = {
        next: notExpected(done, "should never emmit"),
        error: runCallbackAndDone(done, onError),
        complete: notExpected(done, "should never complete"),
    };
    return o;
};
export const expectOnlyCompletion = (done, onCompletion) => {
    const o = {
        next: notExpected(done, "should never emmit"),
        error: notExpected(done, "unexpected error:"),
        complete: runCallbackAndDone(done, onCompletion),
    };
    return o;
};
export const expectEmitionsAndCompletion = (done, onNext, onCompletion) => {
    const o = {
        next: runCallbackAndDone(done, onNext),
        error: notExpected(done, "unexpected error:"),
        complete: runCallbackAndDone(done, onCompletion),
    };
    return o;
};
//# sourceMappingURL=util.js.map