import { TestBed } from '@angular/core/testing';

import { BackwardProjectionListReksadanaService } from './backward-projection-list-reksadana.service';

describe('BackwardProjectionListReksadanaService', () => {
  let service: BackwardProjectionListReksadanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackwardProjectionListReksadanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
