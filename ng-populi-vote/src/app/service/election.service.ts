import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Election } from '../interface/election';
import { OptionResponse } from '../interface/option-response.interface';
import { OngoingElection } from '../interface/ongoing-election.interface';

@Injectable({ providedIn: 'root' })
export class ElectionService {

  private readonly path = '/api/elections';

  constructor(private httpClient: HttpClient) {

  }

  getElections(): Observable<Election[]> {
    return this.httpClient.get<Election[]>(this.path);
  }

  getOngoingElections(): Observable<OngoingElection[]> {
    return this.httpClient.get<OngoingElection[]>(`${this.path}/ongoing`);
  }

  findById(id: number): Observable<Election> {
    return this.httpClient.get<Election>(`${this.path}/${id}`);
  }

  createOrUpdate(request: Election): Observable<Election> {
    return this.httpClient.put<Election>(`${this.path}`, request);
  }

  deleteElection(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.path}/${id}`);
  }

  getElectionTypes(): Observable<OptionResponse[]> {
    return this.httpClient.get<OptionResponse[]>(`${this.path}/types`);
  }

}
