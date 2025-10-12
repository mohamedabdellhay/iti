import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Portfolio } from './portfolio/portfolio';
import { Footer } from './footer/footer';
import { Skills } from './skills/skills';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hero, About, Portfolio, Footer, Skills],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('day-1');
}
