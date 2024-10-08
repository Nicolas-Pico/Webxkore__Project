import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'public', loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) },
  {
    path: 'authenticated',
    loadChildren: () => import('./modules/authenticated/authenticated.module').then(m => m.AuthenticatedModule)
  },
  { path: '', redirectTo: 'public/home', pathMatch: 'full' },  // Redirige a home por defecto
  { path: '**', redirectTo: 'public/home' }  // Cualquier ruta inválida redirige a home
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
