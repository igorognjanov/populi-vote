import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectoralDistrict } from '../interface/electoral-district.interface';

@Injectable({ providedIn: 'root' })
export class ElectoralDistrictService {

  private readonly path = '/api/electoral-district';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ElectoralDistrict[]> {
    return this.httpClient.get<ElectoralDistrict[]>(this.path);
  }

  create(request: ElectoralDistrict): Observable<ElectoralDistrict> {
    return this.httpClient.post<ElectoralDistrict>(this.path, request);
  }

  delete(id: number): Observable<ElectoralDistrict> {
    return this.httpClient.delete<ElectoralDistrict>(`${this.path}/${id}`);
  }

  findById(id: number): Observable<ElectoralDistrict> {
    return this.httpClient.get<ElectoralDistrict>(`${this.path}/${id}`);
  }

}
