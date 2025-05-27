import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TestService {

  constructor(private httpClient: HttpClient) {

  }

  getTest(): Observable<boolean>{
    return this.httpClient.get<boolean>('/api/test');
  }

}
