import { Routes } from '@angular/router';
import { GameDetailsComponent } from './components/game-details/game-details';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Cadastros } from './pages/cadastros/cadastros';
import { HomeLogado } from './pages/home-logado/home-logado';
import { Lgpd } from './pages/lgpd/lgpd';
import { loginGuardGuard } from './guards/login-guard-guard';

export const routes: Routes = [
    
    {
        path:"",
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then(c => Home)
    },
    {
        path:"login",
        pathMatch: 'full',
        loadComponent: () => import('./pages/login/login').then(c => Login )
    },
    {
        path:"cadastro",
        pathMatch: 'full',
        loadComponent: () => import('./pages/cadastros/cadastros').then(c => Cadastros) 
    },
     {
        path:"home-logado",
        pathMatch: 'full',
        loadComponent: () => import('./pages/home-logado/home-logado').then(c => HomeLogado ),
        canActivate: [loginGuardGuard] // Proteger esta rota
    },
    {
        path: 'game-details/:slug',
        loadComponent: () => import('./components/game-details/game-details').then(c => GameDetailsComponent),
        canActivate: [loginGuardGuard] // Proteger esta rota
    },
    {
        path: 'lgpd',
        loadComponent: () => import('./pages/lgpd/lgpd').then(c => Lgpd)
    }
];
