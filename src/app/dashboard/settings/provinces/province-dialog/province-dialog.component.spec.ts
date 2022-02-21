import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceDialogComponent } from './province-dialog.component';

describe('ProvinceDialogComponent', () => {
  let component: ProvinceDialogComponent;
  let fixture: ComponentFixture<ProvinceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
