import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Authentication } from './authentication/authentication';
import { Stage } from './stage/stage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Stage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular__retail_manager');
}
