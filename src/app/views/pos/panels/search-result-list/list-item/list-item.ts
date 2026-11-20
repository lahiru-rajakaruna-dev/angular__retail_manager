import { Component, HostListener, input, output } from '@angular/core';
import { Product } from '../../../../../constants';

@Component({
  selector: 'rm-list-item',
  imports: [],
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
})
export class ListItem {
  onSelect = output<string>();
  item = input.required<Product>();

  @HostListener('click')
  select() {
    console.log(this.item());
    this.onSelect.emit(this.item().id);
  }
}
