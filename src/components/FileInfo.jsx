import React from 'react';

const FileInfo = ({ selectedItem }) => {
  if (!selectedItem) {
    return <div className="border p-4 rounded">Select a file or folder to view details</div>;
  }

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">File Information</h2>
      <p><strong>Name:</strong> {selectedItem.name}</p>
      <p><strong>Type:</strong> {selectedItem.type}</p>
      {selectedItem.type === 'file' && (
        <>
          <p><strong>Size:</strong> {selectedItem.size} bytes</p>
          <p><strong>Last Modified:</strong> {new Date(selectedItem.lastModified).toLocaleString()}</p>
          <p><strong>Summary:</strong> {selectedItem.summary}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Content Preview:</h3>
            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
              {selectedItem.content}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

export default FileInfo;