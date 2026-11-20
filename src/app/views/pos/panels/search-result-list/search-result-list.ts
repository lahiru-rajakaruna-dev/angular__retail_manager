import { Component, ElementRef, inject, input, output } from '@angular/core';
import { Product } from '../../../../constants';
import { ListItem } from './list-item/list-item';

@Component({
  selector: 'app-search-result-list',
  imports: [ListItem],
  templateUrl: './search-result-list.html',
  styleUrl: './search-result-list.scss',
  host: {
    '(window:keydown.escape)': 'onEscape($event)',
  },
})
export class SearchResultList {
  itemList = input.required<Product[]>();
  elementRef = inject(ElementRef<HTMLElement>);

  itemSelect = output();
  close = output();

  constructor() {}

  onItemSelect(event: string) {
    this.itemSelect.emit();
  }

  onEscape(event: Event) {
    if ((event as KeyboardEvent).code === 'Escape') {
      this.close.emit();
    }
  }
}
