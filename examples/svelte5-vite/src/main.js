import { mount } from 'svelte';
import App from './App.svelte';

// Svelte 5 uses `mount()` instead of `new App({ target })`.
const app = mount(App, {
  target: document.getElementById('app')
});

export default app;
