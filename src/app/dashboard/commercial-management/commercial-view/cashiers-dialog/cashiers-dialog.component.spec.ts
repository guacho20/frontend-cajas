import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashiersDialogComponent } from './cashiers-dialog.component';

describe('CashiersDialogComponent', () => {
  let component: CashiersDialogComponent;
  let fixture: ComponentFixture<CashiersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashiersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashiersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
