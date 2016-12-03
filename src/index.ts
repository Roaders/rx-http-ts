
import https = require('https');
import http = require('http');
import RxNode = require('rx-node');
import Rx = require('rx');
import urlUtil = require('url');

const HTTP = "http:";
const HTTPS = "https:";

export enum RestVerb{
    POST,
    GET,
    DELETE,
    PUT
}

/**
 * gets a url and returns a string
 * @param String url - the url to load
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<string>
 */
export function get(url: string, useHttps = false): Rx.Observable<string>{
    var options = getOptionsFromUrlString(url,useHttps);

    options.method = RestVerb[RestVerb.GET];

    return makeHttpRequest(options);
}

/**
 * gets a url and converts the returned string into a json object
 * @param String url - the url to load
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<T>
 */
export function getJson<T>(url: string, useHttps = false): Rx.Observable<T>{
    var options = getOptionsFromUrlString(url,useHttps);

    options.method = RestVerb[RestVerb.GET];

    return makeHttpRequest(options)
        .map(result => JSON.parse(result) as T);
}

/**
 * posts string data to a url and reutrns the result as a string
 * @param String url - the url to load
 * @param data - data to post
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<string>
 */
export function post(url:string, data: string, useHttps = false): Rx.Observable<string>{
    var options = getOptionsFromUrlString(url,useHttps);

    options.method = RestVerb[RestVerb.POST];

    return makeHttpRequest(options,data);
}

/**
 * posts json data to a url and reutrns json
 * @param String url - the url to load
 * @param data - data to post
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<T>
 */
export function postJson<T>(url:string, data: any, useHttps = false): Rx.Observable<T>{
    var options = getOptionsFromUrlString(url,useHttps);

    options.method = RestVerb[RestVerb.POST];

    return makeHttpRequest(options,JSON.stringify(data))
        .map(result => JSON.parse(result) as T);
}

/**
 * puts string data to a url and reutrns the result as a string
 * @param String url - the url to load
 * @param data - data to put
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<string>
 */
export function put(url:string, data: string, useHttps = false): Rx.Observable<string>{
    var options = getOptionsFromUrlString(url,useHttps);

    options.method = RestVerb[RestVerb.PUT];

    return makeHttpRequest(options,data);
}

/**
 * puts json data to a url and reutrns json
 * @param String url - the url to load
 * @param data - data to post
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<T>
 */
export function putJson<T>(url:string, data: any, useHttps = false): Rx.Observable<T>{
    var options = getOptionsFromUrlString(url,useHttps);

    options.method = RestVerb[RestVerb.PUT];

    return makeHttpRequest(options,JSON.stringify(data))
        .map(result => JSON.parse(result) as T);
}

/**
 * sends a delete request to a url and optionally sends data
 * @param String url - the url to load
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<string>
 */
export function deleteItem(url:string, data?: string, useHttps = false): Rx.Observable<string>{
    var options = getOptionsFromUrlString(url,useHttps);

    options.method = RestVerb[RestVerb.DELETE];

    return makeHttpRequest(options,data);
}

/**
 * makes am http request
 * @param options http.RequestOptions object to configure the request
 * @param data - optional data to send with request
 * @returns Rx.Observable<string>
 */
export function makeHttpRequest(options: http.RequestOptions, data?: any): Rx.Observable<string>{

    return Rx.Observable.defer(() => {
        const request = options.protocol === HTTPS ? https.request(options) : http.request(options) ;

        const errorObservable = Rx.Observable.fromEvent(<any>request, "error")
            .flatMap(error => {
                return Rx.Observable.throw(error);
            });

        const responseObservable = Rx.Observable.fromEvent(<any>request, "response");

        if(data){
            request.write(data);
        }

        request.end();

        return responseObservable.merge(errorObservable)
            .take(1);
        })
        .flatMap( response => RxNode.fromReadableStream(<any>response))
        .toArray()
        .map(function(allData){
            return allData.join("");
        });
}

/**
 * transforms a url into an http.RequestOptions object
 * @param String url - the url to transform
 * @param boolean useHttps - use https
 * @returns http.RequestOptions object
 */
export function getOptionsFromUrlString(url: string, useHttps: boolean): http.RequestOptions{
    var urlObject = urlUtil.parse(url);

    return {
        hostname: urlObject.hostname,
        port: Number(urlObject.port),
        path: urlObject.path,
        protocol: useHttps ? HTTPS : HTTP
    };
}