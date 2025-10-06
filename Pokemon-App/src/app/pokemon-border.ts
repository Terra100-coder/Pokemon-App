import { Directive, ElementRef, HostListener, input } from '@angular/core';
import { getPokemonColor } from './pokemon.model';

@Directive({
  selector: '[appPokemonBorder]'
})
export class PokemonBorder {

  private initial_color: string;
  pokemonType = input.required<string>();

  constructor(private el: ElementRef) {
    this.initial_color = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '2px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = getPokemonColor(this.pokemonType());
    this.setBorder(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    const color = this.initial_color;
    this.setBorder(color);
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

}
