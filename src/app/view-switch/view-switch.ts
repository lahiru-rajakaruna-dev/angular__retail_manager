import { Component, signal, WritableSignal } from '@angular/core';
import { View } from '../constants';
import { Pos } from '../views/pos/pos';
import { Settings } from '../views/settings/settings';
import { Dashboard } from '../views/dashboard/dashboard';
import { Profile } from '../views/profile/profile';

@Component({
  selector: 'rm-view-switch',
  imports: [Pos, Settings, Dashboard, Profile],
  templateUrl: './view-switch.html',
  styleUrl: './view-switch.scss',
})
export class ViewSwitch {
  view: WritableSignal<View> = signal(View.PROFILE);

  switchToDashboard() {
    this.view.set(View.DASHBOARD);
  }
  switchToPos() {
    this.view.set(View.POS);
  }
  switchToProfile() {
    this.view.set(View.PROFILE);
  }
  switchToSettings() {
    this.view.set(View.SETTINGS);
  }
  switchToShop() {
    this.view.set(View.SHOP);
  }
}
