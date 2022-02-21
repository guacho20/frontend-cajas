import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialCashboxesDialogComponent } from './commercial-cashboxes-dialog.component';

describe('CommercialCashboxesDialogComponent', () => {
  let component: CommercialCashboxesDialogComponent;
  let fixture: ComponentFixture<CommercialCashboxesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialCashboxesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialCashboxesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
