import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailServersComponent } from './email-servers.component';

describe('EmailServersComponent', () => {
  let component: EmailServersComponent;
  let fixture: ComponentFixture<EmailServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
