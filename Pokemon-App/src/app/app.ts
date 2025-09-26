import { Component, computed, inject, signal } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { PokemonBorder } from './pokemon-border';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
[x: string]: any;


}
