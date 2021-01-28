import { TestBed } from '@angular/core/testing';

import { PlannerPembelianService } from './planner-pembelian.service';

describe('PlannerPembelianService', () => {
  let service: PlannerPembelianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerPembelianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
