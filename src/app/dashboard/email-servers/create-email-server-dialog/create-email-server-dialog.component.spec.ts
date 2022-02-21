import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailServerDialogComponent } from './create-email-server-dialog.component';

describe('CreateEmailServerDialogComponent', () => {
  let component: CreateEmailServerDialogComponent;
  let fixture: ComponentFixture<CreateEmailServerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmailServerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmailServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
