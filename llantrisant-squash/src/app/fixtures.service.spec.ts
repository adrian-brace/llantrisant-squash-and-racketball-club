import { TestBed, inject } from '@angular/core/testing';

import { FixturesService } from './fixtures.service';

describe('FixturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixturesService]
    });
  });

  it('should be created', inject([FixturesService], (service: FixturesService) => {
    expect(service).toBeTruthy();
  }));
});
