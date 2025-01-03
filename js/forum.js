import { extend } from 'flarum/extend';
import app from 'flarum/forum/app';

import LogInModal from 'flarum/components/LogInModal';
import SignUpModal from 'flarum/components/SignUpModal';

function togglePasswordVisibility(passwordField, eyeIcon) {
  if (!passwordField) return;

  const isPasswordVisible = passwordField.type === 'text';
  passwordField.type = isPasswordVisible ? 'password' : 'text';

  if (eyeIcon) {
    eyeIcon.className = isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash';
  }
}

function addEyeButton(passwordField) {
  if (!passwordField) return;

  const eyeButton = document.createElement('span');
  eyeButton.className = 'eye-button';
  eyeButton.innerHTML = '<i class="fas fa-eye"></i>';

  const eyeIcon = eyeButton.querySelector('i');
  eyeButton.addEventListener('click', () => {
    togglePasswordVisibility(passwordField, eyeIcon);
  });

  const wrapper = passwordField.parentElement;
  if (!wrapper) return;


  eyeButton.style.position = 'absolute';
  eyeButton.style.right = '10px';
  eyeButton.style.top = '50%';
  eyeButton.style.transform = 'translateY(-50%)';
  eyeButton.style.cursor = 'pointer';

  wrapper.appendChild(eyeButton);
}

function addAutocompleteAttributes(modalElement) {
  if (!modalElement) return;

  const usernameField = modalElement.querySelector("input[name='identification']") || modalElement.querySelector("input[name='email']");
  if (usernameField) {
    usernameField.setAttribute('autocomplete', 'username');
  }

  const passwordField = modalElement.querySelector("input[name='password']");
  if (passwordField) {
    passwordField.setAttribute('autocomplete', 'current-password');
  }
}

app.initializers.add('huseyinfiliz-show-password', () => {
  extend(LogInModal.prototype, 'oncreate', function () {
    const modalElement = this.element;
    const passwordField = modalElement.querySelector("input[name='password']");
    if (passwordField) {
      addEyeButton(passwordField);
    }
    addAutocompleteAttributes(modalElement);
  });

  extend(SignUpModal.prototype, 'oncreate', function () {
    const modalElement = this.element;
    const passwordField = modalElement.querySelector("input[name='password']");
    if (passwordField) {
      addEyeButton(passwordField);
    }
    addAutocompleteAttributes(modalElement);
  });
});
