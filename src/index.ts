import { DEFAULT_FONT_SIZE } from "./constants";
import { expandSkeletons } from "./converter/skeletonToElement";
import { graphToExcalidraw } from "./graphToExcalidraw";
import { parseMermaid } from "./parseMermaid";
import { ExcalidrawScene, MermaidToExcalidrawResult } from "./types/excalidraw";
import { validateMermaid } from "./validateMermaid";

export interface MermaidConfig {
  /**
   * Whether to start the diagram automatically when the page loads.
   * @default false
   */
  startOnLoad?: boolean;
  /**
   * The flowchart curve style.
   * @default "linear"
   */
  flowchart?: {
    curve?: "linear" | "basis";
  };
  /**
   * Theme variables
   * @default { fontSize: "25px" }
   */
  themeVariables?: {
    fontSize?: string;
  };
  /**
   * Maximum number of edges to be rendered.
   * @default 1000
   */
  maxEdges?: number;
  /**
   * Maximum number of characters to be rendered.
   * @default 1000
   */
  maxTextSize?: number;
}

export interface ExcalidrawConfig {
  fontSize?: number;
}

const parseMermaidToExcalidraw = async (
  definition: string,
  config?: MermaidConfig
) => {
  const mermaidConfig = config || {};
  const fontSize =
    parseInt(mermaidConfig.themeVariables?.fontSize ?? "") || DEFAULT_FONT_SIZE;
  const parsedMermaidData = await parseMermaid(definition, {
    ...mermaidConfig,
    themeVariables: {
      ...mermaidConfig.themeVariables,
      // Multiplying by 1.25 to increase the font size by 25% and render correctly in Excalidraw
      fontSize: `${fontSize * 1.25}px`,
    },
  });
  // Only font size supported for excalidraw elements
  const excalidrawElements = graphToExcalidraw(parsedMermaidData, {
    fontSize,
  });
  return excalidrawElements;
};

const serializeToExcalidraw = (
  result: MermaidToExcalidrawResult
): ExcalidrawScene => {
  return {
    type: "excalidraw",
    version: 2,
    source: "https://excalidraw.com",
    elements: expandSkeletons(result.elements),
    appState: {
      gridSize: 20,
      gridStep: 5,
      gridModeEnabled: false,
      viewBackgroundColor: "#ffffff",
      lockedMultiSelections: {},
    },
    files: result.files || {},
  };
};

export { parseMermaidToExcalidraw, validateMermaid, serializeToExcalidraw };
