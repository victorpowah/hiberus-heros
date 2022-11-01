import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../../services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  hero!: Hero;
  heroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    let heroId: number = Number(this.route.snapshot.paramMap.get('id'));

    if (heroId) {
      this.heroService.getHero(heroId).subscribe((hero: Hero) => {
        this.hero = hero;

        this.heroForm = this.fb.group({
          name: new FormControl(this.hero.name, [
            Validators.required
          ])
        });
      });
    }
    else {
      this.hero = {
        id: 0,
        name: ""
      };

      this.heroForm = this.fb.group({
        name: new FormControl("", [
          Validators.required
        ])
      });
    }
  }

  private add(name: string): void {
    name = name.trim();
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this._location.back();
      });
  }

  private edit(hero: Hero): void {
    this.heroService.updateHero(hero)
      .subscribe(hero => {
        this._location.back();
      });
  }

  public closeForm(): void {
    this.hero.name = this.heroForm.getRawValue().name;
    if (this.hero.id) {
      this.edit(this.hero);
    }
    else {
      this.add(this.hero.name);
    }
  }

  public return(): void {
    this._location.back();
  }
}
