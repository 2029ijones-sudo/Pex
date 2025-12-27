import React from 'react';

/**
 * Recursive FileTree to support nested folders
 */
const FileTree = ({ files, onSelectFile, parentPath = '', selectedFilePath }) => {
  return (
    <div className="w-64 p-2 border-r h-full overflow-auto">
      {Object.entries(files).map(([name, value]) => {
        const path = parentPath ? `${parentPath}/${name}` : name;
        if (typeof value === 'string') {
          // file
          return (
            <div
              key={path}
              className={`p-1 hover:bg-gray-200 cursor-pointer ${
                selectedFilePath === path ? 'bg-gray-300 font-bold' : ''
              }`}
              onClick={() => onSelectFile(path, value)}
            >
              {name}
            </div>
          );
        } else if (typeof value === 'object') {
          // folder
          return (
            <div key={path} className="ml-2">
              <p className="font-semibold">{name}/</p>
              <FileTree
                files={value}
                onSelectFile={onSelectFile}
                parentPath={path}
                selectedFilePath={selectedFilePath}
              />
            </div>
          );
        } else return null;
      })}
    </div>
  );
};

export default FileTree;
