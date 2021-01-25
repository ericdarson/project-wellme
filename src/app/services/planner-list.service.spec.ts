import { TestBed } from '@angular/core/testing';

import { PlannerListService } from './planner-list.service';

describe('PlannerListService', () => {
  let service: PlannerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
