import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';


import { State } from 'src/app/reducers';
import { State as EntitiesState } from 'src/app/models/general';
import { City, BusinessType } from 'src/app/models/settings';
import { commercialCreateRequest } from 'src/app/reducers/commercial-entities/actions';
import { EntitiesActionTypes } from 'src/app/reducers/commercial-entities/types';
import { CreateCommercialBody } from 'src/app/models/commercial-entities';

@Component({
  selector: 'app-commercial-dialog',
  templateUrl: './commercial-dialog.component.html',
  styleUrls: ['./commercial-dialog.component.scss']
})
export class CommercialDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  actionsSub: Subscription;
  generalStoreSub: Subscription;
  settingStoreSub: Subscription;

  states: Array<EntitiesState> = [];
  cities: Array<City> = [];
  types: Array<BusinessType> = [];

  @ViewChild('fileInput') input: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<CommercialDialogComponent>,
    private fb: FormBuilder,
    private store: Store<State>,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.generalStoreSub = this.store.select(
      store => store.general
    )
      .pipe(
        map(general => {
          this.states = general.states;
        })
      )
      .subscribe();

    this.settingStoreSub = this.store.select(
      store => store.settings
    )
      .pipe(
        map(settings => {
          this.cities = settings.all_cities;
          this.types = settings.business_types;
        })
      )
      .subscribe();
    this.actionsSub = this.actions$.pipe(
      ofType(
        EntitiesActionTypes.commercialCreateSuccess,
      ),
      map(() => this.dialogRef.close(true))
    ).subscribe();

    this.formGroup = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      ruc: this.fb.control('', [Validators.required]),
      state: this.fb.control(null),
      type: this.fb.control(null, [Validators.required]),
      city: this.fb.control(null, [Validators.required]),
      owner: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required]),
      cellphone: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      entry_date: this.fb.control(new Date(), [Validators.required]),
      end_date: this.fb.control(new Date(), [Validators.required]),
      abbr: this.fb.control('', [Validators.required]),
      lon: this.fb.control('', [Validators.required]),
      lat: this.fb.control('', [Validators.required]),
    });
  }

  ngOnDestroy() {
    this.actionsSub.unsubscribe();
    this.settingStoreSub.unsubscribe();
    this.settingStoreSub.unsubscribe();
  }

  openPhoto(event: Event) {
    event.preventDefault();
    this.input.nativeElement.click();
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onSave($event: Event) {
    $event.preventDefault();
    this.save();
  }

  save() {
    if (this.formGroup.valid) {
      const { state, city, type, ...commercial } = this.formGroup.getRawValue();
      const createBody: CreateCommercialBody = {
        commercial: commercial,
        city_id: city,
        type_id: type
      }
      if (state) {
        createBody.state_id = state;
      }
      this.store.dispatch(commercialCreateRequest({ commercial: createBody }));
    }
  }

}
