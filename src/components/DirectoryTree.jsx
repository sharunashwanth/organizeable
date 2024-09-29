import React from 'react';

const DirectoryTree = ({ fileSystem, onSelect }) => {
  const renderTree = (node) => (
    <div key={node.id} className="ml-4">
      <div 
        className="cursor-pointer hover:bg-gray-100 p-1"
        onClick={() => onSelect(node)}
      >
        {node.type === 'folder' ? '📁' : '📄'} {node.name}
      </div>
      {node.type === 'folder' && node.children.map(renderTree)}
    </div>
  );

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">Directory Structure</h2>
      {renderTree(fileSystem)}
    </div>
  );
};

export default DirectoryTree;