import { Injectable } from '@angular/core';
import { Pokemon, pokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemonList(): pokemonList {
    return POKEMON_LIST;
  }

  getPokemonById(id: number): Pokemon {
    const pokemon = POKEMON_LIST.find((pokemon) => pokemon.id === id);

    if (!pokemon) {
      throw new Error(`No pokemon found with id ${id}`);
    }

    return pokemon;
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol'
    ];
  }

}
