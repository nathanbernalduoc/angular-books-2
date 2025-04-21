import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { DetalleComponent } from './components/detalle/detalle.component';

export const routes: Routes = [
    {path: 'principal', component: PrincipalComponent},
    {path: 'detalle', component: DetalleComponent},
    {path: '**', redirectTo: 'principal'},
];
