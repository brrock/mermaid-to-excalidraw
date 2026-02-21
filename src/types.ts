import {
  ExcalidrawRectElement,
  ExcalidrawDiamondElement,
  ExcalidrawEllipseElement,
} from "./types/excalidraw";

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type ExcalidrawVertexElement =
  | ExcalidrawRectElement
  | ExcalidrawDiamondElement
  | ExcalidrawEllipseElement;

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
