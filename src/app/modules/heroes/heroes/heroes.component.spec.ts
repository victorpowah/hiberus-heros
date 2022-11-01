import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';
import { HeroesRoutingModule } from '../heroes-routing.module';

import { HeroesComponent } from './heroes.component';

import * as $ from 'jquery';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from "@angular/router/testing";
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';

export class HeroServiceStub {
  heroes = [
    { id: 12, name: 'Dr. Nice' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr. IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

  getHeroes() {
    return of(this.heroes);
  }

  addHero() {
    return of({});
  }

  searchHeroes() {
    return of(this.heroes);
  }
}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, ConfirmDialogComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        HeroesRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({}),
        RouterTestingModule],
      providers: [
        { provide: HeroService, useClass: HeroServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', () => {
    const spy = spyOn(component, 'filterHeroes').and.callThrough();

    let matFormField = fixture.debugElement.query(By.css('mat-form-field'));
    let el = matFormField.nativeElement;
    el.dispatchEvent(new CustomEvent('keyup'));

    expect(spy.calls.any()).toBeTrue();
  });

  it('should open modal', () => {
    const spy = spyOn(component, 'openHeroForm').and.callThrough();

    let addButton = fixture.debugElement.query(By.css('button'));
    let el = addButton.nativeElement;
    el.dispatchEvent(new CustomEvent('click'));

    expect(spy.calls.any()).toBeTrue();
  });

  it('should render grid', () => {
    let table = fixture.debugElement.query(By.css('table'));
    expect(table).not.toBeNull()
  });

  it('should delete a hero', () => {
    const spy = spyOn(component, 'deleteHero').and.callThrough();
    let deleteButton = fixture.debugElement.query(By.css('#buttonDelete12'));
    let el = deleteButton.nativeElement;
    el.dispatchEvent(new CustomEvent('click'));

    let confirmButton = $('#confirmButton');
    confirmButton.click();
    expect(spy.calls.any()).toBeTrue();
  });
});
