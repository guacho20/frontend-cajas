import { TestBed } from '@angular/core/testing';

import { CommercialEntitiesService } from './commercial-entities.service';

describe('CommercialEntitiesService', () => {
  let service: CommercialEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercialEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
