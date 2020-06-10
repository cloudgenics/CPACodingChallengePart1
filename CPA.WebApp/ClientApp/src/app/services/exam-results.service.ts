import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface IExamResults {
  subject: string;
  results: Array<IResults>;
}

export interface IResults {
  year: number;
  grade: string;
}

export interface IPassResults {
  year: number;
  subject: string;
}

export interface IResultsByYear {
  key: string;
  value: Array<IPassResults>;
}


@Injectable({
  providedIn: 'root'
})
export class ExamResultsService {
  routePrefix = 'api/examResults';
  constructor(private http: HttpClient) { }

  public getExamResults(): Observable<IExamResults[]> {
    return this.http.get<IExamResults[]>(`${this.routePrefix}`);
  }
}
