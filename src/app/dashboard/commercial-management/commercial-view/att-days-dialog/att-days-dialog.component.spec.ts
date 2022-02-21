import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttDaysDialogComponent } from './att-days-dialog.component';

describe('AttDaysDialogComponent', () => {
  let component: AttDaysDialogComponent;
  let fixture: ComponentFixture<AttDaysDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttDaysDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttDaysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
