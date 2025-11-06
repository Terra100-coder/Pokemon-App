import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonList } from './pokemon/pokemon-list/pokemon-list';
import { PokemonProfile } from './pokemon/pokemon-profile/pokemon-profile';
import { PageNotFound } from './page-not-found/page-not-found';
import { PokemonEdit } from './pokemon/pokemon-edit/pokemon-edit';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { Login } from './login/login';
import { PokemonAdd } from './pokemon/pokemon-add/pokemon-add';
import { PokemonService } from './pokemon.service';
import { environment } from '../environments/environment';
import { PokemonLocalStorageService } from './pokemon-local-storage.service';
import { PokemonJSONServerService } from './pokemon-json-server.service';

export function pokemonServiceFactory(): PokemonService {
  return environment.production
    ? new PokemonLocalStorageService()
    : new PokemonJSONServerService();
}

const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Connexion'
  },
  {
    path: 'pokemons',
    canActivateChild: [AuthGuard],
    children: [
  {
    path: 'add',
    component: PokemonAdd,
    title: "Ajout d'un pokémon"
  },
  {
    path: 'edit/:id',
    component: PokemonEdit,
    title: "Edition d'un pokemon",
  },
  {
    path: ':id',
    component: PokemonProfile,
    title: 'Pokemon',
  },
  {
    path: '',
    component: PokemonList,
    title: 'Pokedex',
  },
    ]
  },
  {path: '', redirectTo: '/pokemons', pathMatch: 'full'},
  {path: '**', component: PageNotFound},
];


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: PokemonService,
      useFactory: pokemonServiceFactory,
    },
  ]
};
