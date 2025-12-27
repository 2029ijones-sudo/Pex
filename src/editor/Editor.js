import React, { useState } from 'react';
import FileTree from './FileTree';
import { savePackage } from '../services/github';

/**
 * Editor supporting multiple files, folders, and subfolders
 */
const Editor = ({ user }) => {
  // files structure: nested folders supported
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

  // Update file content in state
  const handleContentChange = (e) => {
    setFileContent(e.target.value);

    // Update nested files properly
    const keys = selectedFilePath.split('/');
    setFiles((prev) => {
      let newFiles = { ...prev };
      let pointer = newFiles;
      for (let i = 0; i < keys.length - 1; i++) {
        pointer[keys[i]] = { ...pointer[keys[i]] };
        pointer = pointer[keys[i]];
      }
      pointer[keys[keys.length - 1]] = e.target.value;
      return newFiles;
    });
  };

  // Save package to Supabase/GitHub
  const handleSave = async () => {
    try {
      const packageName = prompt('Enter package name:');
      const isPrivate = confirm('Make this package private?');
      const url = await savePackage(files, packageName, isPrivate);
      alert(`Package saved! URL: ${url}`);
    } catch (err) {
      alert('Error saving package: ' + err.message);
      console.error(err);
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

export default Editor;
