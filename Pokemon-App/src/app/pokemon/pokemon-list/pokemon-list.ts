import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.model';
import { PokemonBorder } from '../../pokemon-border';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorder, DatePipe, RouterLink],
  templateUrl: './pokemon-list.html',
  styles: `.pokemon-card { cursor: pointer }`
})
export class PokemonList {

  readonly #pokemonService = inject(PokemonService);
  readonly searchTerm = signal('');
  pokemonList = toSignal(this.#pokemonService.getPokemonList(), {
    initialValue: [],
  });

  readonly pokemonListFiltered = computed(() => {
    const pokemonList = this.pokemonList();
    const searchTerm = this.searchTerm();

    return pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  });

  readonly loading = computed(() => this.pokemonList().length === 0);

  size (pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }

    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }

}
