import { Component, OnInit } from '@angular/core';
import { ExamResultsService, IExamResults, IPassResults, IResultsByYear } from '../services/exam-results.service';
import { GroupByPipe } from '../pipes/groupBy.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [GroupByPipe]
})

export class HomeComponent implements OnInit {
  constructor(
    private examService: ExamResultsService,
    private groupBy: GroupByPipe
  ) { }

  exmaResultsByYear: IResultsByYear[];

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.examService.getExamResults()
      .subscribe(data => {
        if (data) {
          const results = this.groupResultsByYear(data);
          this.exmaResultsByYear =  this.sortBy(results);
        }
      });
  }

  groupResultsByYear(examResults: Array<IExamResults>) {
    const passResults = new Array<IPassResults>();
     examResults.map(value => {
      const results = value.results.filter(x => x.grade.toLowerCase() == 'pass');
      results.map(y => {
        passResults.push({ year: y.year, subject: value.subject })
      });
    });
    return this.groupBy.transform(passResults, 'year') as IResultsByYear[];
  }

  sortBy(data: IResultsByYear[]): IResultsByYear[] {
    data.forEach(x => {
      x.value.sort((a, b) => (a.subject < b.subject ? -1 : 1));
    });
    return data;
  }
}
