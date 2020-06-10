import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { ExamResultsService, IExamResults } from '../services/exam-results.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fakeExamService: any;

  const testdata: IExamResults[] = [
    { "subject": "Strategic Management Accounting", "results": [{ "year": 2015, "grade": "FAIL" }, { "year": 2016, "grade": "PASS" }] },
    { "subject": "Financial Reporting", "results": [{ "year": 2015, "grade": "PASS" }] },
  ];

  beforeEach(async(() => {
    fakeExamService = jasmine.createSpyObj('ExamResultsService', ['getExamResults']);
    fakeExamService.getExamResults.and.returnValue(of(testdata));

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ExamResultsService, useValue: fakeExamService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.exmaResultsByYear = component.groupResultsByYear(testdata);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('groupedData should contain 2 groups', () => {
    const examResults = component.groupResultsByYear(testdata);
    expect(examResults.length).toBe(2);
  });

  it('matching expected values', () => {
    const expectedValue = [{ year: 2015, subject: 'Financial Reporting' }];

    const examResults = component.groupResultsByYear(testdata);
    const result = examResults[0].value;
    expect(result).toEqual(expectedValue); 
  });

  it('year 2015 and 2016 both has one passing subject', () => {
    const examResults = component.groupResultsByYear(testdata);
    expect(examResults[0].value.length).toBe(1);
    expect(examResults[1].value.length).toBe(1);
  });

  });
