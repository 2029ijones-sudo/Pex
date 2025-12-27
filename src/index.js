// src/index.js
import { initSupabase } from './services/supabase.js';
import Editor from './editor/Editor.js'; // default export

// Grab the root div
const rootElement = document.getElementById('root');

(async function initApp() {
  // Initialize Supabase and get the current user
  const user = await initSupabase();

  if (!user) {
    rootElement.innerHTML = '<p>Loading user...</p>';
    return;
  }

  // Clear root content
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

  // Mount the editor using its default export directly
  Editor(main, user); // Editor internally handles React rendering
})();
