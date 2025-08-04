import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OptionStatsResponse } from '../interface/response/option-stats-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ElectionStatsService {

  private readonly path = '/api/election-stats';

  constructor(private http: HttpClient) {}

  getAllOptionStatsForElectionId(electionId: number): Observable<OptionStatsResponse[]> {
    return this.http.get<OptionStatsResponse[]>(`${this.path}/${electionId}`);
  }

}
