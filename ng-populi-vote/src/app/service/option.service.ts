import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OptionRequest } from '../interface/request/option-request.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptionService {

  private readonly path = 'api/options';

  constructor(private http: HttpClient) {}

  updateOptions(options: OptionRequest[]): Observable<void> {
    return this.http.post<void>(this.path, options);
  }

}
