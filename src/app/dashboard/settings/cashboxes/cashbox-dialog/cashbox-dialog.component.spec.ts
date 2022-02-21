import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxDialogComponent } from './cashbox-dialog.component';

describe('CashboxDialogComponent', () => {
  let component: CashboxDialogComponent;
  let fixture: ComponentFixture<CashboxDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashboxDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashboxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
