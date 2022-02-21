import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CommercialEntitiesEffects } from './commercial-entities.effects';

describe('CommercialEntitiesEffects', () => {
  let actions$: Observable<any>;
  let effects: CommercialEntitiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommercialEntitiesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CommercialEntitiesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
