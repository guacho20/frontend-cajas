import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuditEffects } from './audit.effects';

describe('AuditEffects', () => {
  let actions$: Observable<any>;
  let effects: AuditEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuditEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AuditEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
