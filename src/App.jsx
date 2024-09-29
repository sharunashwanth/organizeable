import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DirectoryTree from './components/DirectoryTree';
import FileInfo from './components/FileInfo';

const initialFileSystem = {
  root: {
    id: "root",
    name: "Root",
    type: "folder",
    children: [
      {
        id: "code-folder",
        name: "Code",
        type: "folder",
        children: [
          {
            id: "file-1",
            name: "main.py",
            type: "file",
            size: 1024,
            lastModified: Date.now(),
            content: "def main():\n    print('Hello, World!')\n\nif __name__ == '__main__':\n    main()",
            summary: "Python script with a main function that prints 'Hello, World!'"
          },
          {
            id: "file-2",
            name: "index.js",
            type: "file",
            size: 2048,
            lastModified: Date.now(),
            content: "function greet(name) {\n    console.log(`Hello, ${name}!`);\n}\n\ngreet('World');",
            summary: "JavaScript file with a greet function"
          },
          {
            id: "subfolder-1",
            name: "Projects",
            type: "folder",
            children: [
              {
                id: "file-3",
                name: "project1.java",
                type: "file",
                size: 3072,
                lastModified: Date.now(),
                content: "public class Project1 {\n    public static void main(String[] args) {\n        System.out.println(\"Project 1\");\n    }\n}",
                summary: "Java class for Project 1"
              }
            ]
          }
        ]
      },
      {
        id: "document-folder",
        name: "Documents",
        type: "folder",
        children: [
          {
            id: "file-4",
            name: "notes.txt",
            type: "file",
            size: 512,
            lastModified: Date.now(),
            content: "This is a sample text file with some notes.\nIt can contain multiple lines of text.\nUseful for storing quick information.",
            summary: "Text file with sample notes"
          },
          {
            id: "file-5",
            name: "report.md",
            type: "file",
            size: 1536,
            lastModified: Date.now(),
            content: "# Project Report\n\n## Introduction\nThis is a sample project report written in Markdown.\n\n## Conclusion\nMarkdown is great for simple formatting.",
            summary: "Markdown file with a sample project report"
          }
        ]
      },
      {
        id: "other-folder",
        name: "Other",
        type: "folder",
        children: [
          {
            id: "file-6",
            name: "data.csv",
            type: "file",
            size: 2560,
            lastModified: Date.now(),
            content: "Name,Age,City\nJohn,30,New York\nJane,25,San Francisco\nBob,35,Chicago",
            summary: "CSV file with sample data"
          }
        ]
      }
    ]
  }
};

const App = () => {
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFileUpload = async (file) => {
    const content = await file.text();
    const fileType = determineFileType(content, file.name);
    
    const newFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      type: 'file',
      size: file.size,
      lastModified: file.lastModified,
      content: content,
      summary: generateSummary(content)
    };

    let folderId;
    switch (fileType) {
      case 'code':
        folderId = 'code-folder';
        break;
      case 'document':
        folderId = 'document-folder';
        break;
      default:
        folderId = 'other-folder';
    }

    setFileSystem(prevSystem => {
      const newSystem = JSON.parse(JSON.stringify(prevSystem));
      const folder = newSystem.root.children.find(child => child.id === folderId);
      folder.children.push(newFile);
      return newSystem;
    });
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content-Based File Sorter</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <div className="flex mt-4">
        <div className="w-1/3 pr-4">
          <DirectoryTree fileSystem={fileSystem.root} onSelect={handleItemSelect} />
        </div>
        <div className="w-2/3 pl-4">
          <FileInfo selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
};

// Helper functions for content-based sorting
const determineFileType = (content, fileName) => {
  // Check file extension first
  const extension = fileName.split('.').pop().toLowerCase();
  if (['py', 'js', 'java', 'c', 'cpp', 'html', 'css'].includes(extension)) {
    return 'code';
  }
  
  // Then check content
   if (content.length > 100 && !content.includes('<')) {
    return 'document';
  } else {
    return 'other';
  }
};

const generateSummary = (content) => {
  return content.slice(0, 100) + (content.length > 100 ? '...' : '');
};

export default App;