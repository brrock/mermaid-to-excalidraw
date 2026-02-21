/**
 * Excalidraw types based on the official Excalidraw scene format.
 * References:
 * - https://raw.githubusercontent.com/excalidraw/excalidraw/master/packages/excalidraw/element/types.ts
 * - https://raw.githubusercontent.com/excalidraw/excalidraw/master/packages/excalidraw/data/types.ts
 */

export type FileId = string & { _brand: "FileId" };
export type DataURL = string & { _brand: "DataURL" };

export type StrokeStyle = "solid" | "dashed" | "dotted";
export type FillStyle = "hachure" | "cross-hachure" | "solid" | "zigzag";
export type StrokeSharpness = "round" | "sharp";

export type Arrowhead =
  | "arrow"
  | "bar"
  | "dot"
  | "triangle"
  | "triangle_outline"
  | "diamond"
  | "diamond_outline";

export type VerticalAlign = "top" | "middle" | "bottom";
export type TextAlign = "left" | "center" | "right";
export type ElementStatus = "pending" | "saved" | "error";

export type Roundness = {
  type: number; // 1: legacy, 2: standard, 3: extra-round
  value?: number;
};

export interface ExcalidrawElementBase {
  id: string;
  x: number;
  y: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: FillStyle;
  strokeWidth: number;
  strokeStyle: StrokeStyle;
  roughness: number;
  opacity: number;
  width: number;
  height: number;
  angle: number;
  seed: number;
  version: number;
  versionNonce: number;
  isDeleted: boolean;
  groupIds: readonly string[];
  frameId: string | null;
  boundElements: readonly { type: "text" | "arrow"; id: string }[] | null;
  updated: number;
  link: string | null;
  locked: boolean;
  type: string;
  index: string;
}

export interface ExcalidrawGenericElement extends ExcalidrawElementBase {
  type: "rectangle" | "diamond" | "ellipse" | "selection";
  roundness: Roundness | null;
}

export interface ExcalidrawTextElement extends ExcalidrawElementBase {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: number;
  textAlign: TextAlign;
  verticalAlign: VerticalAlign;
  containerId: string | null;
  originalText: string;
  autoResize?: boolean;
  lineHeight?: number;
}

export interface ExcalidrawLinearElement extends ExcalidrawElementBase {
  type: "arrow" | "line";
  points: readonly number[][];
  lastCommittedPoint?: readonly number[] | null;
  startBinding?: { elementId: string; focus: number; gap: number } | null;
  endBinding?: { elementId: string; focus: number; gap: number } | null;
  startArrowhead: Arrowhead | null;
  endArrowhead: Arrowhead | null;
}

export type ExcalidrawElement =
  | ExcalidrawGenericElement
  | ExcalidrawTextElement
  | ExcalidrawLinearElement;

export type AppState = {
  gridSize: number | null;
  gridStep: number;
  gridModeEnabled: boolean;
  viewBackgroundColor: string;
  lockedMultiSelections: Record<string, boolean>;
  theme?: "light" | "dark";
  name?: string;
  [key: string]: any;
};

export type BinaryFileData = {
  mimeType: string;
  id: FileId;
  dataURL: DataURL;
  created: number;
  lastRetrieved?: number;
  status?: ElementStatus;
};

export type BinaryFiles = Record<FileId, BinaryFileData>;

export interface ExcalidrawScene {
  type: "excalidraw";
  version: 2;
  source: string;
  elements: readonly ExcalidrawElement[];
  appState: Partial<AppState>;
  files: BinaryFiles;
}

// Intermediate type for mermaid conversion
export interface ElementLabel {
  text: string;
  fontSize?: number;
  fontFamily?: number;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
  groupIds?: string[];
  strokeColor?: string;
}

export interface ExcalidrawElementSkeleton {
  id?: string;
  type: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  angle?: number;
  groupIds?: string[];
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
  strokeStyle?: StrokeStyle;
  fillStyle?: FillStyle;
  roughness?: number;
  opacity?: number;
  seed?: number;
  version?: number;
  versionNonce?: number;
  isDeleted?: boolean;
  boundElements?: { id: string; type: "text" | "arrow" }[] | null;
  updated?: number;
  link?: string | null;
  locked?: boolean;
  index?: string;
  label?: ElementLabel;
  points?: number[][];
  startArrowhead?: Arrowhead | null;
  endArrowhead?: Arrowhead | null;
  start?: { id?: string; type?: string };
  end?: { id?: string; type?: string };
  [key: string]: any;
}

export interface MermaidToExcalidrawResult {
  elements: ExcalidrawElementSkeleton[];
  files: BinaryFiles;
}
