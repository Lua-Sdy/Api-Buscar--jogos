import { Routes } from '@angular/router';
import { GameSearchComponent } from './components/game-search/game-search';
import { GameDetailsComponent } from './components/game-details/game-details';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { GameSearch } from './pages/game-search/game-search';

export const routes: Routes = [
    { path: '', component: GameSearchComponent },
    { path: 'game/:slug', component: GameDetailsComponent },

    {
        path:"",
        pathMatch: 'full',
        loadComponent: () => import('./pages/login/login').then(c => Login )
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