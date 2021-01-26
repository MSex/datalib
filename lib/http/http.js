import { from } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { mergeMap } from "rxjs/operators";
export class RequestFactoryImpl {
    build(path, init) {
        return new Request(path, init);
    }
}
// TODO read stream
// TODO error handling
export class FetcherImpl {
    fetch(request) {
        return fromFetch(request);
    }
    fetchBodyJson(request) {
        return fromFetch(request, { selector: (response) => response.json() });
    }
    fetchBodyText(request) {
        return fromFetch(request, { selector: (response) => response.text() });
    }
    fetchBodyLines(request) {
        return this.fetchBodyText(request).pipe(mergeMap((body) => from(body.split(/\r?\n/))));
    }
    fetchBodyJsonLines(request) {
        return this.fetchBodyLines(request).pipe(mergeMap((line) => JSON.parse(line)));
    }
}
// export  makeJsonDecoder = () => {
//   return new TransformStream({
//     start(controller) {
//       controller.buf = "";
//       controller.pos = 0;
//     },
//     transform(chunk, controller) {
//       controller.buf += chunk;
//       while (controller.pos < controller.buf.length) {
//         if (controller.buf[controller.pos] == "\n") {
//           const line = controller.buf.substring(0, controller.pos);
//           controller.enqueue(JSON.parse(line));
//           controller.buf = controller.buf.substring(controller.pos + 1);
//           controller.pos = 0;
//         } else {
//           ++controller.pos;
//         }
//       }
//     },
//   });
// }
//# sourceMappingURL=http.js.map