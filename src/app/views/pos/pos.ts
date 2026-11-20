import {
  Component,
  ComponentRef,
  DOCUMENT,
  effect,
  inject,
  resource,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { SearchResultList } from './panels/search-result-list/search-result-list';
import { SearchPanel } from './panels/search-panel/search-panel';
import { Cart } from './panels/cart-panel/cart-panel';
import { PaymentPanel } from './panels/payment-panel/payment-panel';
import { BillPanel } from './panels/bill-panel/bill-panel';
import { StatusBar } from './panels/status-bar/status-bar';
import { PopRenderer } from '../../services/popup-renderer/pop-renderer';
import api from '../../api';
import { Product, SaleItem, SalePayment } from '../../constants';
import { ModalRenderer } from '../../services/modal-renderer/modal-renderer';
import { InsertCartItemModal } from '../../Modals/insert-cart-item-modal/insert-cart-item-modal';

@Component({
  selector: 'rm-pos',
  imports: [SearchPanel, Cart, PaymentPanel, BillPanel, StatusBar],
  templateUrl: './pos.html',
  styleUrl: './pos.scss',
})
export class Pos {
  popupRenderer = inject(PopRenderer);
  modalRenderer = inject(ModalRenderer);

  searchPanel = viewChild(SearchPanel);
  document = inject(DOCUMENT);
  popUpRef: ComponentRef<SearchResultList> | null = null;
  searchQuery: WritableSignal<string | undefined> = signal(undefined);
  searchResultContainer = signal<ComponentRef<any> | undefined>(undefined);

  selectedProduct = signal<Product | undefined>(undefined);
  cart = signal<SaleItem[] | undefined>(undefined);
  payment = signal<SalePayment | undefined>(undefined);

  inputTimer: number | null = null;

  products = resource<Product[], string | undefined>({
    defaultValue: [],
    params: () => {
      return this.searchQuery() ?? undefined;
    },
    async loader(opts) {
      const response = await api.products.getAllProducts();
      const products = await response.json();
      return [
        {
          code: '1231',
          id: '1',
          inventory: 500,
          price: 120.89,
          name: 'Soda',
          createdAt: new Date('2026-01-05').getTime(),
          updatedAt: new Date('2026-01-05').getTime(),
        },
        {
          code: '1231',
          id: '2',
          inventory: 500,
          price: 120.89,
          name: 'Soda',
          createdAt: new Date('2026-01-05').getTime(),
          updatedAt: new Date('2026-01-05').getTime(),
        },
        {
          code: '1231',
          id: '3',
          inventory: 500,
          price: 120.89,
          name: 'Soda',
          createdAt: new Date('2026-01-05').getTime(),
          updatedAt: new Date('2026-01-05').getTime(),
        },
      ];
    },
  });

  constructor() {
    effect(() => {
      console.log(this.products.status());
      if (this.products.status() === 'resolved') {
        if (this.products.hasValue()) {
          this.renderSearchResultList();
        }
      }
      if (this.products.status() === 'error') {
        console.warn(this.products.error());
      }
    });
  }

  getQuery(value: string) {
    this.searchQuery.set(value);
  }

  addItemToCart(item: SaleItem) {
    if (!item) {
      return;
    }

    this.cart.update((items) => {
      const itemsArray: SaleItem[] = [];
      if (items) {
        itemsArray.push(...items);
      }
      items!.push(item);
      return itemsArray;
    });
  }

  removeItemFromCart(item: SaleItem) {}

  private showCartItemInsertModal() {
    const modalRef = this.modalRenderer.renderModal(InsertCartItemModal);
  }

  private onProductSelect() {
    this.showCartItemInsertModal();
  }

  private cleanupSearchbar() {
    this.searchPanel()?.cleanupSearchbar();
  }

  private attachEventHandlersToResultList(ref: ComponentRef<SearchResultList>) {
    ref.instance.itemSelect.subscribe(() => {
      this.onProductSelect();
      this.cleanupSearchbar();
      ref.destroy();
    });
    ref.instance.close.subscribe(() => {
      ref.destroy();
    });
  }

  private setSearchResultListInputs(ref: ComponentRef<SearchResultList>) {
    ref.setInput('itemList', this.products.value());
  }

  private checkResultListRendereReady() {
    if (!this.searchPanel() || this.searchPanel()?.getSearchbarElement() === undefined) {
      return false;
    }
    return true;
  }

  private renderSearchResultList() {
    if (!this.checkResultListRendereReady()) {
      return;
    }
    const popupRef = this.popupRenderer.renderPopup(
      SearchResultList,
      this.searchPanel()!.getSearchbarElement()!,
    );
    this.attachEventHandlersToResultList(popupRef);
    this.setSearchResultListInputs(popupRef);
    this.searchResultContainer.set(popupRef);
  }
}
