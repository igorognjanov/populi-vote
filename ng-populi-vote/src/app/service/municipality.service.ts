import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OptionResponse } from '../interface/option-response.interface';
import { MunicipalityRequest } from '../interface/request/municipality-request.interface';
import { MunicipalityResponse } from '../interface/response/municipality-response.interface';

@Injectable({ providedIn: 'root' })
export class MunicipalityService {

  private readonly path = '/api/municipality';

  constructor(private httpClient: HttpClient) {}

  save(request: MunicipalityRequest): Observable<MunicipalityResponse> {
    return this.httpClient.post<MunicipalityResponse>(this.path, request);
  }

  findAll(): Observable<MunicipalityResponse[]> {
    return this.httpClient.get<MunicipalityResponse[]>(this.path);
  }

  findAllAsOptions(): Observable<OptionResponse[]> {
    return this.httpClient.get<OptionResponse[]>(`${this.path}/options`);
  }

  findById(id: number): Observable<MunicipalityResponse> {
    return this.httpClient.get<MunicipalityResponse>(`${this.path}/${id}`);
  }

  delete(id: number): Observable<MunicipalityResponse> {
    return this.httpClient.delete<MunicipalityResponse>(`${this.path}/${id}`);
  }
}
