import { Component, ElementRef, output, signal, viewChild, ViewChild } from '@angular/core';

@Component({
  selector: 'rm-search-panel',
  imports: [],
  templateUrl: './search-panel.html',
  styleUrl: './search-panel.scss',
})
export class SearchPanel {
  searchBar = viewChild<ElementRef<any>>('queryInput');
  inputTimeOut: number | undefined;

  query = signal('');
  outputQuery = output<string>();

  handleInput(event: Event) {
    if (this.inputTimeOut) {
      clearTimeout(this.inputTimeOut);
    }
    this.inputTimeOut = setTimeout(() => {
      const data = ((event as InputEvent).target as HTMLInputElement).value;
      this.query.set(data ?? '');
      this.outputQuery.emit(this.query());
    }, 250);
  }
}
