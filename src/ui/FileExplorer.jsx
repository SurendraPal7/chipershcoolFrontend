import React, { useState } from "react";

export default function FileExplorer({ files = [], onCreate, onOpen }) {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [renamingFileId, setRenamingFileId] = useState(null);
  const [newName, setNewName] = useState("");

  const toggleFolder = (id) => {
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRename = (file) => {
    setRenamingFileId(file.id || file._id);
    setNewName(file.name);
  };

  const confirmRename = (file) => {
    file.name = newName;
    setRenamingFileId(null);
  };

  const renderFiles = (parentId = null, level = 0) => {
    return files
      .filter((f) => f.parentId === parentId)
      .map((file) => {
        const isFolder = file.type === "folder";
        const isExpanded = expandedFolders[file.id || file._id];
        const hasChildren = files.some((f) => f.parentId === (file.id || file._id));

        return (
          <div key={file.id || file._id}>
            <div
              className={`flex items-center justify-between group px-2 py-1 cursor-pointer text-sm ${
                isFolder ? "text-indigo-300" : "text-gray-300"
              } hover:bg-[#333]`}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => (isFolder ? toggleFolder(file.id || file._id) : onOpen(file.id || file._id))}
            >
              {/* Folder/File Icon and Name */}
              <div className="flex items-center gap-1">
                {isFolder ? (
                  <span>{isExpanded ? "📂" : "📁"}</span>
                ) : (
                  <span>📄</span>
                )}
                {renamingFileId === (file.id || file._id) ? (
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={() => confirmRename(file)}
                    onKeyDown={(e) => e.key === "Enter" && confirmRename(file)}
                    className="bg-transparent border-b border-gray-500 text-gray-200 outline-none w-24"
                    autoFocus
                  />
                ) : (
                  <span>{file.name}</span>
                )}
              </div>

              {/* Hover Actions */}
              <div className="hidden group-hover:flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRename(file);
                  }}
                  className="text-xs text-yellow-400 hover:text-yellow-300"
                  title="Rename"
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete "${file.name}"?`)) {
                      const index = files.findIndex((f) => f.id === file.id);
                      if (index > -1) files.splice(index, 1);
                    }
                  }}
                  className="text-xs text-red-400 hover:text-red-300"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Render children if expanded */}
            {isFolder && isExpanded && hasChildren && renderFiles(file.id || file._id, level + 1)}
          </div>
        );
      });
  };

  return (
    <div className="p-2 text-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-300">Explorer</h3>
        <div className="flex gap-1">
          <button
            onClick={() => onCreate({ parentId: null, name: "New Folder", type: "folder" })}
            className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-0.5 rounded"
          >
            📁+
          </button>
          <button
            onClick={() => onCreate({ parentId: null, name: "New File.js", type: "file" })}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded"
          >
            📄+
          </button>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-auto">
        {files && files.length > 0 ? (
          renderFiles()
        ) : (
          <p className="text-gray-500 text-xs text-center py-4">No files yet</p>
        )}
      </div>
    </div>
  );
}
