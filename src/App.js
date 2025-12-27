import React, { useEffect, useState } from 'react';
import Editor from './editor/Editor';
import { initSupabase, getCurrentUser } from './services/supabase';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const loggedInUser = await initSupabase();
      setUser(loggedInUser);
    };
    init();
  }, []);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-gray-800 text-white font-bold text-xl">
        Pex - Web Package Creator
      </header>
      <main className="flex-1 flex">
        <Editor user={user} />
      </main>
    </div>
  );
};

export default App;
