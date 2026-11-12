import {
  ApplicationRef,
  BaseResourceOptions,
  Component,
  ComponentRef,
  createComponent,
  DOCUMENT,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  OnInit,
  resource,
  signal,
  viewChild,
  ViewChild,
  ViewRef,
  WritableSignal,
} from '@angular/core';
import { SearchResultList } from './panels/search-result-list/search-result-list';
import { SearchPanel } from './panels/search-panel/search-panel';
import { Cart } from './panels/cart-panel/cart-panel';
import { PaymentPanel } from './panels/payment-panel/payment-panel';
import { BillPanel } from './panels/bill-panel/bill-panel';
import { StatusBar } from './panels/status-bar/status-bar';
import { PopRenderer } from '../../pop-renderer';
import api from '../../api';

@Component({
  selector: 'rm-pos',
  imports: [SearchPanel, Cart, PaymentPanel, BillPanel, StatusBar],
  templateUrl: './pos.html',
  styleUrl: './pos.scss',
})
export class Pos {
  searchPanel = viewChild(SearchPanel);
  document = inject(DOCUMENT);
  popupRenderer = inject(PopRenderer);
  popUpRef: ComponentRef<SearchResultList> | null = null;
  inputTimer: number | null = null;
  searchQuery: WritableSignal<string | undefined> = signal(undefined);
  searchResultContainer = signal<ComponentRef<any> | undefined>(undefined);

  products = resource<
    { id: string; name: string; price: BigInt; inventory: BigInt }[],
    string | undefined
  >({
    defaultValue: [],
    params: () => {
      return this.searchQuery() ?? undefined;
    },
    async loader({ abortSignal, params, previous }) {
      console.log(params);
      const response = await api.products.getAllProducts();
      const products = await response.json();
      return products;
    },
  });

  constructor() {
    effect(() => {
      if (!this.products.hasValue()) {
        return;
      }
      const products = this.products.value();
      if (products.length <= 0) {
        return;
      }
      this.renderSearchResultList();
    });
    effect(() => {
      if (!this.searchResultContainer()) {
        return;
      }

      (this.searchPanel()?.searchBar()?.nativeElement as HTMLInputElement).addEventListener(
        'blur',
        (e) => {
          // this.searchResultContainer()?.destroy();
        },
      );
    });
  }

  getQuery(value: string) {
    this.searchQuery.set(value);
  }

  renderSearchResultList() {
    console.log(this.searchPanel()?.searchBar());
    if (!this.searchPanel()) {
      return;
    }
    if (!this.searchPanel()!.searchBar()) {
      throw new Error('Could not find the search bar');
    }

    const popupRef = this.popupRenderer.renderPopup(
      SearchResultList,
      this.searchPanel()!.searchBar()!,
    );
    this.searchResultContainer.set(popupRef);
  }
}
