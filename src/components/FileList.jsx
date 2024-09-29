import React from 'react';

const FileList = ({ fileSystem }) => {
  const renderFolder = (folder) => (
    <div key={folder.id} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{folder.name}</h2>
      {folder.children.length > 0 ? (
        <ul className="list-disc pl-5">
          {folder.children.map(item => (
            <li key={item.id} className="mb-1">
              {item.name} {item.type === 'file' && `(${item.size} bytes)`}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No files in this folder</p>
      )}
    </div>
  );

  return (
    <div>
      {fileSystem.children.map(renderFolder)}
    </div>
  );
};

export default FileList;