import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  DOCUMENT,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injectable,
  Type,
  ViewRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalRenderer {
  document = inject(DOCUMENT);

  constructor(
    private appRef: ApplicationRef,
    private envInjector: EnvironmentInjector,
  ) {}

  private getModalRoot() {
    const modalRoot = this.document.getElementById('modal-root');
    if (!modalRoot) {
      throw new Error('Modal root not found');
    }
    return modalRoot;
  }

  private createModal(modal: Type<any>, modalRoot: Element) {
    const modalRef = createComponent(modal, {
      environmentInjector: this.envInjector,
      hostElement: modalRoot,
    });

    return modalRef;
  }

  private createBackDrop(modalRoot: Element) {
    const backdropDIV = this.document.createElement('div');
    backdropDIV.classList.add('modal-backdrop');
    modalRoot.appendChild(backdropDIV);
    return backdropDIV;
  }

  private attachModalToApp(modalElement: ViewRef) {
    this.appRef.attachView(modalElement);
  }

  private attachCleanUpToModal(modalRef: ComponentRef<any>) {
    modalRef.onDestroy(() => {
      this.appRef.detachView(modalRef.hostView);
    });
  }

  private attachCloseCallbackToBackdrop(backdrop: Element, modalRef: ComponentRef<any>) {
    backdrop.addEventListener('click', (e: any) => {
      console.log('BACKDROP CLICKED');
      e.preventDefault();
      e.stopImmediatePropagation();
      modalRef.destroy();
      backdrop.remove();
    });
  }

  renderModal<T>(modal: Type<T>): ComponentRef<T> {
    const modalRoot = this.getModalRoot();
    const modalBackdrop = this.createBackDrop(modalRoot);
    const modalRef = this.createModal(modal, modalBackdrop);
    this.attachCloseCallbackToBackdrop(modalBackdrop, modalRef);
    this.attachModalToApp(modalRef.hostView);
    this.attachCleanUpToModal(modalRef);
    return modalRef;
  }
}
