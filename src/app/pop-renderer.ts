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
export class PopRenderer {
  appRef: ApplicationRef;
  envInjector: EnvironmentInjector;
  document: Document = inject(DOCUMENT);

  constructor(appRef: ApplicationRef, envInjector: EnvironmentInjector) {
    this.appRef = appRef;
    this.envInjector = envInjector;
  }

  private checkPopupRoot() {
    const popupRoot = this.document.querySelector('#popup-root');
    if (!popupRoot) {
      throw new Error('Could not get find the popup root!');
    }
    return popupRoot;
  }

  private createPopupWrapper() {
    const popupWrapper = this.document.createElement('div');
    popupWrapper.classList.add('popup-wrapper');
    popupWrapper.id = crypto.randomUUID().toString();
    return popupWrapper;
  }

  private anchorPopupWrapper(wrapper: HTMLDivElement, anchor: Element) {
    const anchorX = anchor.getBoundingClientRect().x;
    const anchorY = anchor.getBoundingClientRect().y;
    const anchorHeight = anchor.getBoundingClientRect().height;
    const anchorWidth = anchor.getBoundingClientRect().width;

    wrapper.style.position = 'fixed';
    wrapper.style.left = `${anchorX}px`;
    wrapper.style.top = `${anchorY + anchorHeight}px`;
    wrapper.style.width = `${anchorWidth}px`;
  }

  private attachPopupToApp(popupRef: ViewRef) {
    this.appRef.attachView(popupRef);
  }

  private attachCleanUpCallbackToPopup(popupRef: ComponentRef<unknown>, wrapper: HTMLElement) {
    popupRef.onDestroy(() => {
      this.appRef.detachView(popupRef.hostView);
      wrapper.remove();
    });
  }

  renderPopup(popUp: Type<unknown>, anchorElement: ElementRef) {
    const popupRoot = this.checkPopupRoot();
    const popupWrapper = this.createPopupWrapper();
    this.anchorPopupWrapper(popupWrapper, anchorElement.nativeElement);
    popupRoot.appendChild(popupWrapper);
    const popupRef = createComponent(popUp, {
      environmentInjector: this.envInjector,
      hostElement: popupWrapper,
    });
    this.attachPopupToApp(popupRef.hostView);
    this.attachCleanUpCallbackToPopup(popupRef, popupWrapper);
    return popupRef;
  }
}
