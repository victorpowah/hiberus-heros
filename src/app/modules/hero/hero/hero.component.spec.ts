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
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';
import { HeroRoutingModule } from '../hero-routing.module';
import { HeroComponent } from './hero.component';

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

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        HeroRoutingModule,
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
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not set input', () => {
    let input = fixture.debugElement.query(By.css('input'));
    let el = input.nativeElement;
    expect(el.value).toBe("");
  });

  it('should add a hero', () => {
    const spy = spyOn(component, 'closeForm').and.callThrough();
    let input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = "Raul";

    let el = fixture.debugElement.query(By.css('#addButtonModal')).nativeElement;
    el.dispatchEvent(new CustomEvent('click'));

    expect(spy.calls.any()).toBeTrue();
  });
});
