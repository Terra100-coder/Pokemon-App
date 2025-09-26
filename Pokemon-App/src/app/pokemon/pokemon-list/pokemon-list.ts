import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.model';
import { PokemonBorder } from '../../pokemon-border';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorder, DatePipe, RouterLink],
  templateUrl: './pokemon-list.html',
  styles: ``
})
export class PokemonList {

  readonly #pokemonService = inject(PokemonService);
  readonly searchTerm = signal('');
  pokemonList = signal(this.#pokemonService.getPokemonList());

  readonly pokemonListFiltered = computed(() => {
    const pokemonList = this.pokemonList();
    const searchTerm = this.searchTerm();

    return pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  });

  size (pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }

    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }

  incrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life + 1;
  }

  decrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life - 1;
  }

}
