import { Routes } from '@angular/router';
import { GameSearchComponent } from './components/game-search/game-search';
import { GameDetailsComponent } from './components/game-details/game-details';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { GameSearch } from './pages/game-search/game-search';
import { Cadastros } from './pages/cadastros/cadastros';

export const routes: Routes = [
    
    {
        path:"",
        pathMatch: 'full',
        loadComponent: () => import('./pages/login/login').then(c => Login )
    },
    {
        path:"cadastro",
        pathMatch: 'full',
        loadComponent: () => import('./pages/cadastros/cadastros').then(c => Cadastros) 
    },
     {
        path:"home",
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then(c => Home)
    },
     {
        path:"game-search",
        pathMatch: 'full',
        loadComponent: () => import('./pages/game-search/game-search').then(c => GameSearch )
    }
];