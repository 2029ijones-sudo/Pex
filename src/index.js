// src/index.js

import { initSupabase, getCurrentUser } from './services/supabase';
import { loadEditor } from './editor/Editor'; // assuming Editor exposes a function to mount itself

// Grab root div
const rootElement = document.getElementById('root');

// Initialize your app
(async function initApp() {
  // Example: fetch user
  const user = await initSupabase();

  if (!user) {
    rootElement.innerHTML = '<p>Loading user...</p>';
    return;
  }

  // Clear root
  rootElement.innerHTML = '';

  // Create header
  const header = document.createElement('header');
  header.textContent = 'Pex - Web Package Creator';
  header.style.padding = '1rem';
  header.style.backgroundColor = '#333';
  header.style.color = '#fff';
  header.style.fontWeight = 'bold';
  header.style.fontSize = '1.2rem';
  rootElement.appendChild(header);

  // Create main container
  const main = document.createElement('main');
  main.style.display = 'flex';
  main.style.flexDirection = 'column';
  main.style.height = 'calc(100vh - 60px)';
  rootElement.appendChild(main);

  // Load your editor inside main
  loadEditor(main, user); // assume Editor.js exposes this
})();
