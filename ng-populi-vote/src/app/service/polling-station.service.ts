import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PollingStationResponse } from '../interface/response/polling-station-response.interface';
import { PollingStationRequest } from '../interface/request/polling-station-request.interface';

@Injectable({ providedIn: 'root' })
export class PollingStationService {

  private readonly path = '/api/polling-station';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<PollingStationResponse[]> {
    return this.httpClient.get<PollingStationResponse[]>(this.path);
  }

  findById(id: number): Observable<PollingStationResponse> {
    return this.httpClient.get<PollingStationResponse>(`${this.path}/${id}`);
  }

  delete(id: number): Observable<PollingStationResponse> {
    return this.httpClient.delete<PollingStationResponse>(`${this.path}/${id}`);
  }

  create(request: PollingStationRequest): Observable<PollingStationResponse> {
    return this.httpClient.post<PollingStationResponse>(this.path, request);
  }



}
