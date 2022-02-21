import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsTypesDialogComponent } from './bs-types-dialog.component';

describe('BsTypesDialogComponent', () => {
  let component: BsTypesDialogComponent;
  let fixture: ComponentFixture<BsTypesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsTypesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
