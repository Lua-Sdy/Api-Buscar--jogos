import { Routes } from '@angular/router';
import { GameSearchComponent } from './components/game-search/game-search';
import { GameDetailsComponent } from './components/game-details/game-details';

export const routes: Routes = [
    { path: '', component: GameSearchComponent },
    { path: 'game/:slug', component: GameDetailsComponent },
];