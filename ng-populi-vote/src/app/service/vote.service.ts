import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoteService {

  private readonly path = '/api/vote';

  constructor(private http: HttpClient) {}

  create(optionId: number): Observable<void> {
    return this.http.post<void>(`${this.path}/${optionId}`, {});
  }

  hasUserVotedOnElection(electionId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.path}/has-voted/${electionId}`, {});
  }
}
