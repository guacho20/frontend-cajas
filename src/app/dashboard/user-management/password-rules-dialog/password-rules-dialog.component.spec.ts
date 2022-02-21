import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRulesDialogComponent } from './password-rules-dialog.component';

describe('PasswordRulesDialogComponent', () => {
  let component: PasswordRulesDialogComponent;
  let fixture: ComponentFixture<PasswordRulesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRulesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
