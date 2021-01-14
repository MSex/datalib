import { Observable } from "rxjs";
export interface RequestFactory {
    build(path: string, init?: RequestInit): Request;
}
export declare abstract class ARequestFactory {
    abstract build(path: string, init?: RequestInit): Request;
}
export declare class RequestFactoryImpl implements RequestFactory {
    build(path: string, init?: RequestInit): Request;
}
export interface Fetcher {
    fetch(request: Request): Observable<Response>;
    fetchBodyJson(request: Request): Observable<unknown>;
    fetchBodyText(request: Request): Observable<string>;
    fetchBodyLines(request: Request): Observable<string>;
    fetchBodyJsonLines(request: Request): Observable<unknown>;
}
export declare class FetcherImpl implements Fetcher {
    fetch(request: Request): Observable<Response>;
    fetchBodyJson(request: Request): Observable<unknown>;
    fetchBodyText(request: Request): Observable<string>;
    fetchBodyLines(request: Request): Observable<string>;
    fetchBodyJsonLines(request: Request): Observable<unknown>;
}
//# sourceMappingURL=http.d.ts.map