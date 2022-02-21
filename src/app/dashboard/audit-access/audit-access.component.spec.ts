import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditAccessComponent } from './audit-access.component';

describe('AuditAccessComponent', () => {
  let component: AuditAccessComponent;
  let fixture: ComponentFixture<AuditAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
