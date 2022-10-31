import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: `heroes`,
    loadChildren: () =>
      import('./modules/heroes/heroes.module').then(m => m.HeroesModule)
    // loadChildren:'./modules/home/home.module#HomeModule'
  },
  {
    path: "",
    redirectTo: `heroes`,
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: `heroes`,
    pathMatch: "full"
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
