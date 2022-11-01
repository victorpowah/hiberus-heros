import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [{
  path: ``,
  component: HeroesComponent
},
{
  path: `:id`,
  loadChildren: () =>
    import('../hero/hero.module').then(m => m.HeroModule)
  // loadChildren:'./modules/home/home.module#HomeModule'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
