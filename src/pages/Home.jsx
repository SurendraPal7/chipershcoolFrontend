import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Welcome to CipherStudio — React IDE</h1>
      <p className="text-gray-700">
        Create projects, write React code in your browser, preview instantly and save to backend.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => nav("/ide")}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Create New Project
        </button>
      </div>

      <section className="mt-6">
        <h2 className="font-medium">Quick Start</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Create a new project in the IDE.</li>
          <li>Use the File Explorer to add files.</li>
          <li>Write React code in the editor on the left and see live preview on the right.</li>
          <li>Click Save to persist to backend.</li>
        </ol>
      </section>
    </div>
  );
}
