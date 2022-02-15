import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Accept', 'application/json')
  .set('Access-Control-Allow-Headers', 'Content-Type');

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {      
    
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params1: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(environment.apiUrl + path, { headers:headers });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      environment.apiUrl + path,
      JSON.stringify(body),{ headers:headers }
    );
  }

  post(path: string, body: Object = {}, isMultipart = false): Observable<any> {        
    return this.http.post(
      environment.apiUrl + path,
      JSON.stringify(body),{ headers:headers });
  }

  delete(path): Observable<any> {
    return this.http.delete(
      environment.apiUrl + path,{ headers:headers }
    );
  }
}
