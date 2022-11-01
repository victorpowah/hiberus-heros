import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  heroes: Hero[] = [];

  dataSource: MatTableDataSource<Hero> = new MatTableDataSource();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private heroService: HeroService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.dataSource = new MatTableDataSource(this.heroes);
        this.dataSource.paginator = this.paginator;
      });
  }

  private delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(result => { this.getHeroes() });
  }

  public openHeroForm(id: number): void {
    //Navegar
    this.router.navigate([`${id}`], { relativeTo: this.route })
  }

  public filterHeroes($event: any): void {
    let heroName = $event.srcElement.value;

    this.heroService.searchHeroes(heroName).subscribe(heroes => {
      this.heroes = heroes;
      this.dataSource = new MatTableDataSource(this.heroes);
      this.dataSource.paginator = this.paginator;
    })
  }

  public deleteHero(hero: Hero): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { height: '200px', width: '300px' });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.delete(hero);
      }
    });
  }
}
