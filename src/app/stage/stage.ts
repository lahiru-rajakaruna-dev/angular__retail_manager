import { Component, computed, resource, signal } from '@angular/core';
import { Authentication } from '../authentication/authentication';
import { HttpStatusCode } from '@angular/common/http';
import { ViewSwitch } from '../view-switch/view-switch';
import api from '../api';

@Component({
  selector: 'rm-stage',
  imports: [Authentication, ViewSwitch],
  templateUrl: './stage.html',
  styleUrl: './stage.scss',
})
export class Stage {
  authCheckResponse = resource({
    params: () => localStorage.getItem('csrf') ?? 50,
    loader: async () => {
      try {
        const value = await api.authentication.canI({ csrf: 'this-is-a-pseudo-csrf' });
        return {
          body: (await value.json()) as { csrf: string },
          status: value.status,
        };
      } catch (e) {
        console.error(e);
        throw new Error((e as Error).message);
      }
    },
  });

  isAuthenticated = computed(() => {
    if (!this.authCheckResponse.hasValue()) {
      return false;
    }

    const value = this.authCheckResponse.value();
    const CSRF_TOKEN = value['body']['csrf'];
    localStorage.setItem('csrf', CSRF_TOKEN);

    if (this.authCheckResponse.value().status == 200) {
      return true;
    }
    return false;
  });
}
