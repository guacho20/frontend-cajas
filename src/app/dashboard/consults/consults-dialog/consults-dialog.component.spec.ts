import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultsDialogComponent } from './consults-dialog.component';

describe('ConsultsDialogComponent', () => {
  let component: ConsultsDialogComponent;
  let fixture: ComponentFixture<ConsultsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
