import { TestBed } from '@angular/core/testing';

import { ShowRefresherService } from './show-refresher.service';

describe('ShowRefresherService', () => {
  let service: ShowRefresherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowRefresherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
