# @brrock/excalidraw-mermaid

Convert Mermaid diagrams to Excalidraw elements.

## Installation

```bash
bun add @brrock/excalidraw-mermaid
# or
npm install @brrock/excalidraw-mermaid
```

**Note:** `mermaid` is a peer dependency and must be installed separately.

```bash
bun add mermaid
# or
npm install mermaid
```

## Usage

### Simple Example

```ts
import {
  parseMermaidToExcalidraw,
  serializeToExcalidraw,
} from "@brrock/excalidraw-mermaid";

const diagramDefinition = `
  graph TD
    A[Start] --> B[End]
`;

try {
  // 1. Convert Mermaid to Excalidraw results (elements and binary files)
  const result = await parseMermaidToExcalidraw(diagramDefinition);

  // 2. (Optional) Serialize to the full .excalidraw file format
  const fullScene = serializeToExcalidraw(result);

  console.log(fullScene);
} catch (e) {
  // Handle parse/validation errors
}
```

## API

### `parseMermaidToExcalidraw(definition, config?)`

Converts a Mermaid diagram definition to Excalidraw results.

**Parameters:**

- `definition` (string): The Mermaid diagram definition.
- `config` (MermaidConfig, optional): Configuration for the Mermaid parser.

**Returns:**

- `Promise<MermaidToExcalidrawResult>`: An object containing `elements` and `files`.

```ts
interface MermaidToExcalidrawResult {
  elements: ExcalidrawElementSkeleton[];
  files?: BinaryFiles;
}
```

### `serializeToExcalidraw(result)`

Wraps the conversion result into a full Excalidraw file structure. This function automatically expands intermediate skeletons into final Excalidraw elements (e.g., separating text labels from shapes and linking them via `containerId`), making the result ready to be saved as an `.excalidraw` file or imported directly.

**Parameters:**

- `result` (MermaidToExcalidrawResult): The output from `parseMermaidToExcalidraw`.

**Returns:**

- `ExcalidrawScene`: A complete Excalidraw scene object.

```ts
interface ExcalidrawScene {
  type: "excalidraw";
  version: 2;
  source: string;
  elements: ExcalidrawElement[]; // Final expanded elements
  appState: {
    gridSize: number;
    viewBackgroundColor: string;
    // ... other app state defaults
  };
  files: BinaryFiles;
}
```

### `validateMermaid(mermaidStr)`

Helper to validate Mermaid syntax before attempting conversion.

**Parameters:**

- `mermaidStr` (string): The Mermaid diagram definition.

**Returns:**

- `Promise<boolean>`: True if valid, throws or returns false otherwise (depending on mermaid version).

## Configuration

### `MermaidConfig`

```ts
interface MermaidConfig {
  startOnLoad?: boolean;
  flowchart?: {
    curve?: "linear" | "basis";
  };
  themeVariables?: {
    fontSize?: string;
  };
  maxEdges?: number;
  maxTextSize?: number;
}
```

### Supported Diagram Types

- Flowchart
- Sequence
- Class

## Building

```bash
bun install
bun run build
```
