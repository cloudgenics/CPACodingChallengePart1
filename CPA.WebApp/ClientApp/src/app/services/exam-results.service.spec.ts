import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExamResultsService, IExamResults } from './exam-results.service';

describe('ExamResultsService', () => {
  let injector: TestBed;
  let service: ExamResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExamResultsService]
    });
    injector = getTestBed();
    service = injector.get(ExamResultsService);
  });


  it('should be created', () => {
    const service: ExamResultsService = TestBed.get(ExamResultsService);
    expect(service).toBeTruthy();
  });
});
