import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';

app.initializers.add('huseyinfiliz-show-password', () => {
  const addEyeButton = function (this: any) {
    const passwordField = this.element.querySelector("input[name='password']");
    if (!passwordField) return;

    // Avoid duplicate buttons on re-render
    if (passwordField.parentElement?.querySelector('.eye-button')) return;

    const eyeButton = document.createElement('span');
    eyeButton.className = 'eye-button';
    eyeButton.innerHTML = '<i class="fas fa-eye"></i>';

    const eyeIcon = eyeButton.querySelector('i')!;
    eyeButton.addEventListener('click', () => {
      const isVisible = passwordField.type === 'text';
      passwordField.type = isVisible ? 'password' : 'text';
      eyeIcon.className = isVisible ? 'fas fa-eye' : 'fas fa-eye-slash';
    });

    passwordField.parentElement?.appendChild(eyeButton);
  };

  extend('flarum/forum/components/LogInModal', 'oncreate', addEyeButton);
  extend('flarum/forum/components/SignUpModal', 'oncreate', addEyeButton);
});
