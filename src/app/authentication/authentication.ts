import { Component, ElementRef, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'rm-authentication',
  imports: [],
  templateUrl: './authentication.html',
  styleUrl: './authentication.scss',
})
export class Authentication {
  @ViewChild('phoneInputField')
  phoneInputField!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputField')
  passwordInputField!: ElementRef<HTMLInputElement>;

  password = signal('');
  phone = signal('');

  checkPassword() {
    let message = [];
    if (this.password().length <= 0) {
      message.push('Insert Password');
    }
    if (!/\w{2,}/g.test(this.password())) {
      message.push('Password cannot contain consecutive whitespaces');
    }
    this.passwordInputField.nativeElement.setCustomValidity(message.join('\n'));
    this.passwordInputField.nativeElement.reportValidity();
  }

  checkPhone() {
    let message = [];
    if (this.phone().length <= 0) {
      message.push('Phone cannot be empty');
    }

    if (!/\w{1,}/g.test(this.phone())) {
      message.push('Phone cannot contain consecutive whitespaces');
    }
    if (/.*[a-zA-Z\-_/\\].*/g.test(this.phone())) {
      message.push('Phone cannot contain any thing other than digits and "+"');
    }
    this.phoneInputField.nativeElement.setCustomValidity(message.join('\n'));
    this.phoneInputField.nativeElement.reportValidity();
  }

  validateCredentials() {
    this.checkPhone();
    this.checkPassword();
  }

  signup(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.validateCredentials();
  }

  login(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.validateCredentials();
  }

  formatPhone(phone: string) {
    let formattedPhone = '';
    if (phone.startsWith('0')) {
      formattedPhone = formattedPhone.concat('+947');
    }
    // +947
    if (phone.length == 5) {
      const fifthChar = phone.charAt(4);
      const isValidOperator = ['1', '2', '4', '6', '7', '8'].includes(fifthChar);
      // SHOW ERROR
      formattedPhone = phone.concat(' ');
    }
    // +9477_
    if (phone.length > 5 && phone.length < 8) {
      formattedPhone = phone;
    }
    // +9477_88
    if (phone.length == 8) {
      formattedPhone = phone.concat(' ');
    }
    // +9477_88_
    if (phone.length > 9 && phone.length < 11) {
      formattedPhone = phone;
    }
    // +9477_88_99
    if (phone.length == 11) {
      formattedPhone = phone.concat(' ');
    }
    // +9477_88_99_
    if (phone.length > 12 && phone.length < 16) {
      formattedPhone = phone;
    }
    // +9477_88_99_222
    if (phone.length > 15) {
      formattedPhone = phone.slice(0, 16);
    }
    return formattedPhone;
  }

  updatePassword(password: string) {
    this.password.set(password);
  }

  updatePhone(phone: string) {
    this.phone.set(phone);
  }

  onPasswordInput(event: Event) {
    event.stopImmediatePropagation();
    this.passwordInputField.nativeElement.checkValidity();
    const element = event.target as HTMLInputElement;
    this.updatePassword(element.value);
  }

  onPhoneInput(event: Event) {
    event.stopImmediatePropagation();
    this.phoneInputField.nativeElement.checkValidity();
    const element = event.target as HTMLInputElement;
    const formattedPhone = this.formatPhone(element.value);
    this.updatePhone(formattedPhone ?? '');
  }
}
