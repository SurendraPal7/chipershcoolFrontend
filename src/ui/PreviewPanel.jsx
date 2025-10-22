import React, { useMemo } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

/*
 PreviewPanel builds a files object for Sandpack from the current `files` array.
 It tries to place files under /src and create a package.json; entry is index.js by default.
*/

export default function PreviewPanel({ files = [], entry = "index.js" }) {
  const sandpackFiles = useMemo(() => {
    const map = {};

    // default package.json
    map["/package.json"] = {
      code: `{
  "name": "cipherstudio-play",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}`,
      hidden: true,
    };

    // put files into /src or root depending on names
    files.forEach((f) => {
      if (f.type === "file") {
        let path = "/src/" + f.name;
        if (f.name === "package.json") path = "/package.json";
        map[path] = { code: f.content || "// empty file" };
      }
    });

    // ensure index.js exists under /src
    if (!map["/src/index.js"]) {
      map["/src/index.js"] = { code: `import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App"; const root = createRoot(document.getElementById("root")); root.render(<App/>);` };
    }
    if (!map["/src/App.js"]) {
      map["/src/App.js"] = { code: `export default function App(){ return <div style={{padding:20}}><h1>Empty App</h1></div> }` };
    }

    // add a static index.html
    map["/public/index.html"] = {
      code: `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>CipherStudio Preview</title></head><body><div id="root"></div></body></html>`,
      hidden: true,
    };

    return map;
  }, [files]);

  return (
    <div className="h-full">
      <Sandpack
        template="react"
        files={sandpackFiles}
        options={{
          showLineNumbers: true,
          showTabs: true,
          activeFile: "/src/App.js",
          editorHeight: 400,
        }}
      />
    </div>
  );
}
