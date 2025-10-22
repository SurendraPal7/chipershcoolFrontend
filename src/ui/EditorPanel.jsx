
import React, { useEffect, useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";



export default function EditorPanel({ file, onChange }) {
  const [localCode, setLocalCode] = useState(file?.content || "");

  useEffect(() => {
    setLocalCode(file?.content || "");
  }, [file?.id, file?.content]);

  if (!file || file.type !== "file") {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a file to start editing
      </div>
    );
  }

  // Dynamically build files map for Sandpack
  const filesForSandpack = {
    "/src/index.js": {
      code:
        file.name === "index.js"
          ? localCode
          : `import App from "./${file.name.replace(".js", "")}";\nconsole.log("App Loaded");`,
    },
    [`/src/${file.name}`]: { code: localCode },
  };

  // Fallback plain editor (if Sandpack fails or file is not .js)
  const isCodeFile = file.name.endsWith(".js") || file.name.endsWith(".jsx");

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-gray-200">
      {/* ---------- Header ---------- */}
      <div className="px-3 py-2 border-b border-gray-700 bg-[#2d2d2d] flex items-center justify-between">
        <div className="font-medium text-sm">{file.name}</div>
        <div className="text-xs text-gray-400">Editing</div>
      </div>

      {/* ---------- Editor ---------- */}
      <div className="flex-1 overflow-auto">
        {isCodeFile ? (
          <Sandpack
            template="react"
            theme="dark"
            files={filesForSandpack}
            options={{
              editorHeight: "100%",
              showTabs: false,
              showLineNumbers: true,
              showConsoleButton: false,
              wrapContent: true,
              editorWidthPercentage: 100,
            }}
            customSetup={{
              entry: "/src/index.js",
              dependencies: {
                react: "^18.0.0",
                "react-dom": "^18.0.0",
              },
            }}
            onChange={(newFiles) => {
              const updated = newFiles[`/src/${file.name}`]?.code;
              if (updated !== undefined) {
                setLocalCode(updated);
                onChange(updated);
              }
            }}
          />
        ) : (
          <textarea
            value={localCode}
            onChange={(e) => setLocalCode(e.target.value)}
            onBlur={() => onChange && onChange(localCode)}
            spellCheck={false}
            className="w-full h-full p-4 bg-[#1e1e1e] text-gray-200 font-mono text-sm outline-none resize-none"
          />
        )}
      </div>
    </div>
  );
}
