import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "cadastrar", component: CadastrarComponent},
    {path: "home", component: HomeComponent},
    {path: "perfil", component: PerfilComponent}
];
