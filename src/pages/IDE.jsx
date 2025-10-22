import React, { useEffect, useState } from "react";
import NavbarIDE from "../ui/NavbarIDE";
import FileExplorer from "../ui/FileExplorer";
import EditorPanel from "../ui/EditorPanel";
import PreviewPanel from "../ui/PreviewPanel";
import FileSidebar from "../ui/FileSidebar";
import { api } from "../utils/api";

export default function IDE() {
  const [projectId, setProjectId] = useState(() => localStorage.getItem("projectId") || null);
  const [projectName, setProjectName] = useState("MyProject");
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);

  // minimal initial project template
  useEffect(() => {
    if (!projectId) {
      // No backend project yet, create initial files locally
      const initialFiles = [
        { id: "f-root", parentId: null, name: "MyProject", type: "folder" },
        { id: "f-src", parentId: "f-root", name: "src", type: "folder" },
        {
          id: "index_js",
          parentId: "f-src",
          name: "index.js",
          type: "file",
          content: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
const root = createRoot(document.getElementById("root"));
root.render(<App />);`,
        },
        {
          id: "app_js",
          parentId: "f-src",
          name: "App.js",
          type: "file",
          content: `import React from "react";
export default function App(){ return (<div style={{padding:20}}><h1>Welcome to CipherStudio</h1><p>Edit this file to see live preview.</p></div>) }`,
        },
        { id: "package_json", parentId: "f-root", name: "package.json", type: "file", content: `{"name":"myproject","version":"1.0.0","dependencies":{"react":"^18.0.0"}}` },
      ];
      setFiles(initialFiles);
      setActiveFileId("app_js");
    } else {
      // TODO: Load from backend if projectId exists
      // fetchProjectFiles(projectId)
    }
  }, [projectId]);

  const createFile = ({ parentId, name, type }) => {
    const newFile = {
      id: Date.now().toString(), // simple local id
      parentId,
      name,
      type,
      content: type === "file" ? "// New file" : undefined,
    };
    setFiles((s) => [...s, newFile]);
    if (type === "file") setActiveFileId(newFile.id);
  };

  const updateFileContent = (id, content) => {
    setFiles((s) => s.map((f) => (f.id === id ? { ...f, content } : f)));
  };

  const saveProject = async () => {
    try {
      // Only include projectId if it looks like a valid MongoDB ObjectId (24-char hex)
      const payload = {
        name: projectName,
        files,
      };
      if (projectId && /^[0-9a-fA-F]{24}$/.test(projectId)) {
        payload.projectId = projectId;
      }

      const response = await api.post("/projects/save", payload);

      // If backend returns a new projectId, save it locally
      if (response.data?.projectId) {
        setProjectId(response.data.projectId);
        localStorage.setItem("projectId", response.data.projectId);
      }

      alert("Saved successfully!");
    } catch (err) {
      console.warn("save failed:", err.message || err);
      alert("Could not save.");
    }
  };

  const activeFile = files.find((f) => f.id === activeFileId);

  return (
    <div className="h-[80vh] border rounded overflow-hidden">
      <NavbarIDE onSave={saveProject} projectName={projectName} setProjectName={setProjectName}/>
      <div className="flex h-[calc(100%-56px)]">
        <div className="w-72 border-r overflow-auto">
          <FileExplorer files={files} onCreate={createFile} onOpen={(id) => setActiveFileId(id)} />
        </div>

        <div className="flex-1 flex flex-col">
          <EditorPanel file={activeFile} onChange={(c) => updateFileContent(activeFile.id, c)} />
        </div>

        <div className="w-1/3 border-l">
          <PreviewPanel files={files} entry="index.js" />
        </div>
      </div>
    </div>
  );
}
