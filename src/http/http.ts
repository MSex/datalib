import { from, Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { mergeMap } from "rxjs/operators";

// TODO replace with bilder to better sintax build.method("GET").body(body)
export interface RequestFactory {
  build(path: string, init?: RequestInit): Request;
}

export abstract class ARequestFactory {
  abstract build(path: string, init?: RequestInit): Request;
}

export class RequestFactoryImpl implements RequestFactory {
  build(path: string, init?: RequestInit): Request {
    return new Request(path, init);
  }
}

export interface Fetcher {
  fetch(request: Request): Observable<Response>;
  fetchBodyJson(request: Request): Observable<unknown>;
  fetchBodyText(request: Request): Observable<string>;
  fetchBodyLines(request: Request): Observable<string>;
  fetchBodyJsonLines(request: Request): Observable<unknown>;
}

// TODO read stream
// TODO error handling
export class FetcherImpl implements Fetcher {
  fetch(request: Request): Observable<Response> {
    return fromFetch(request);
  }

  fetchBodyJson(request: Request): Observable<unknown> {
    return fromFetch(request, { selector: (response) => response.json() });
  }

  fetchBodyText(request: Request): Observable<string> {
    return fromFetch(request, { selector: (response) => response.text() });
  }

  fetchBodyLines(request: Request): Observable<string> {
    return this.fetchBodyText(request).pipe(
      mergeMap((body) => from(body.split(/\r?\n/))),
    );
  }

  fetchBodyJsonLines(request: Request): Observable<unknown> {
    return this.fetchBodyLines(request).pipe(
      mergeMap((line) => JSON.parse(line)),
    );
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
