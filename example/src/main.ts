import { parseMermaidToExcalidraw, serializeToExcalidraw } from "../../";

declare global {
  interface Window {
    convert: () => Promise<void>;
    copyToClipboard: () => Promise<void>;
    download: () => void;
  }
}

let lastResult: any = null;

window.convert = async function () {
  const input = document.getElementById("mermaid-input") as HTMLTextAreaElement;
  const result = document.getElementById("result");

  try {
    // 1. Parse Mermaid definition to Excalidraw elements
    const excalidrawResult = await parseMermaidToExcalidraw(input.value);

    // 2. Serialize to full Excalidraw file format
    const fullScene = serializeToExcalidraw(excalidrawResult);
    lastResult = fullScene;

    result!.textContent = JSON.stringify(fullScene, null, 2);
  } catch (error) {
    result!.textContent = `Error: ${error}`;
  }
};

window.copyToClipboard = async function () {
  if (!lastResult) return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(lastResult, null, 2));
    const btn = document.querySelector(
      'button[onclick="copyToClipboard()"]'
    ) as HTMLButtonElement;
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

window.download = function () {
  if (!lastResult) return;
  const blob = new Blob([JSON.stringify(lastResult, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "diagram.excalidraw";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
