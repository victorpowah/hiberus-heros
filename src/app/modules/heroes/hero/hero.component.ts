import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero!: Hero;

  //Modal mode: 0 to add a hero, 1 to edit a hero
  modalMode: number = 0;

  heroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    if (this.hero.id) {
      this.heroService.getHero(this.hero.id).subscribe((hero: Hero) => {
        this.hero = hero;

        this.heroForm = this.fb.group({
          name: new FormControl(this.hero.name, [
            Validators.required
          ])
        });
      });
    }
    else {
      this.heroForm = this.fb.group({
        name: new FormControl(this.hero.name, [
          Validators.required
        ])
      });
    }
  }

  public closeModal(): Hero {
    this.hero.name = this.heroForm.getRawValue().name;
    return this.hero;
  }
}
