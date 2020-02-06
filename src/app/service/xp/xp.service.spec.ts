import { TestBed } from '@angular/core/testing';

import { XpService } from './xp.service';

describe('XpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XpService = TestBed.get(XpService);
    expect(service).toBeTruthy();
  });
});
