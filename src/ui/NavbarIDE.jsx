import React from "react";

export default function NavbarIDE({ onSave, projectName, setProjectName }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <div className="flex items-center gap-3">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button onClick={onSave} className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
      </div>
      <div className="text-sm text-gray-500">Auto preview using Sandpack</div>
    </div>
  );
}
