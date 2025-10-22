import React from "react";
import { Folder, FileText } from "lucide-react";

export default function FileSidebar({ files, onSelect }) {
  return (
    <div className="w-1/4 bg-gray-100 border-r border-gray-300 overflow-y-auto p-3">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">📁 Project Files</h2>
      {files.length === 0 ? (
        <p className="text-sm text-gray-500">No files yet</p>
      ) : (
        <ul className="space-y-1">
          {files.map((file) => (
            <li
              key={file._id}
              onClick={() => onSelect(file)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50 cursor-pointer transition"
            >
              {file.type === "folder" ? <Folder size={16} /> : <FileText size={16} />}
              <span className="text-gray-700">{file.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
