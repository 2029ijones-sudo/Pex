import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import FileTree from './FileTree';
import { savePackage } from '../services/github';

/**
 * Editor component for creating web packages (.html, .js, .jsx)
 */
const Editor = ({ user }) => {
  // Initial files structure (nested folders supported)
  const [files, setFiles] = useState({
    'index.html': '<h1>Hello Pex!</h1>',
    'script.js': 'console.log("Hello Pex!");',
    'folder1': {
      'subfile.js': 'console.log("Subfile!");'
    }
  });

  const [selectedFilePath, setSelectedFilePath] = useState('index.html');
  const [fileContent, setFileContent] = useState(files[selectedFilePath]);

  // Update content when a new file is selected
  const handleSelectFile = (path, content) => {
    setSelectedFilePath(path);
    setFileContent(content);
  };

  // Update file content in state, including nested folders
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setFileContent(newContent);

    const keys = selectedFilePath.split('/');
    setFiles((prev) => {
      let newFiles = { ...prev };
      let pointer = newFiles;
      for (let i = 0; i < keys.length - 1; i++) {
        pointer[keys[i]] = { ...pointer[keys[i]] };
        pointer = pointer[keys[i]];
      }
      pointer[keys[keys.length - 1]] = newContent;
      return newFiles;
    });
  };

  // Save the current package (supports .html, .js, .jsx files)
  const handleSave = async () => {
    try {
      const packageName = prompt('Enter package name:');
      if (!packageName) return alert('Package name is required.');

      const isPrivate = confirm('Make this package private?');
      const url = await savePackage(files, packageName, isPrivate);

      alert(`Package saved! URL: ${url}`);
    } catch (err) {
      console.error(err);
      alert('Error saving package: ' + err.message);
    }
  };

  return (
    <div className="flex w-full h-full">
      <FileTree
        files={files}
        onSelectFile={handleSelectFile}
        selectedFilePath={selectedFilePath}
      />
      <div className="flex-1 p-4 flex flex-col">
        <textarea
          className="w-full h-full border p-2 flex-1"
          value={fileContent}
          onChange={handleContentChange}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSave}
        >
          Save Package
        </button>
      </div>
    </div>
  );
};

// Expose a mount function for plain JS usage
export function mountEditor(container, user) {
  const root = ReactDOM.createRoot(container);
  root.render(<Editor user={user} />);
}

export default Editor;
