# rx-http

[![Known Vulnerabilities](https://snyk.io/test/github/roaders/rx-http-ts/badge.svg)](https://snyk.io/test/github/roaders/rx-http-ts)

Rx wrapper for node http with typescript definitions

```
/**
 * gets a url and returns a string
 * @param String url - the url to load
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<string>
 */
function get(url: string, useHttps?: boolean): Rx.Observable<string>;

/**
 * gets a url and converts the returned string into a json object
 * @param String url - the url to load
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<T>
 */
function getJson<T>(url: string, useHttps?: boolean): Rx.Observable<T>;

/**
 * posts string data to a url and reutrns the result as a string
 * @param String url - the url to load
 * @param data - data to post
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<string>
 */
function post(url: string, data: string, useHttps?: boolean): Rx.Observable<string>;

/**
 * posts json data to a url and reutrns json
 * @param String url - the url to load
 * @param data - data to post
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<T>
 */
function postJson<T>(url: string, data: any, useHttps?: boolean): Rx.Observable<T>;

/**
 * puts string data to a url and reutrns the result as a string
 * @param String url - the url to load
 * @param data - data to put
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<string>
 */
function put(url: string, data: string, useHttps?: boolean): Rx.Observable<string>;

/**
 * puts json data to a url and reutrns json
 * @param String url - the url to load
 * @param data - data to post
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<T>
 */
function putJson<T>(url: string, data: any, useHttps?: boolean): Rx.Observable<T>;

/**
 * sends a delete request to a url and optionally sends data
 * @param String url - the url to load
 * @param boolean useHttps - use https? defaults to false
 * @returns Rx.Observable<string>
 */
function deleteItem(url: string, data?: string, useHttps?: boolean): Rx.Observable<string>;

/**
 * makes am http request
 * @param options http.RequestOptions object to configure the request
 * @param data - optional data to send with request
 * @returns Rx.Observable<string>
 */
function makeHttpRequest(options: http.RequestOptions, data?: any): Rx.Observable<string>;

/**
 * transforms a url into an http.RequestOptions object
 * @param String url - the url to transform
 * @param boolean useHttps - use https
 * @returns http.RequestOptions object
 */
function getOptionsFromUrlString(url: string, useHttps: boolean): http.RequestOptions;
```
