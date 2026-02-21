import {
  ExcalidrawElementSkeleton,
  ExcalidrawElement,
  ExcalidrawTextElement,
} from "../types/excalidraw";

const generateId = () => Math.random().toString(36).substring(2, 11);

/**
 * Generates a simple index string for Excalidraw elements to maintain order.
 * Excalidraw uses these for z-index layering.
 */
const generateIndex = (i: number) => {
  return `a${i.toString(36).padStart(2, "0")}`;
};

export const expandSkeletons = (
  skeletons: readonly ExcalidrawElementSkeleton[]
): ExcalidrawElement[] => {
  const elements: ExcalidrawElement[] = [];

  for (let i = 0; i < skeletons.length; i++) {
    const skeleton = skeletons[i];
    const { label, ...baseSkeleton } = skeleton;

    const elementId = baseSkeleton.id || generateId();
    const seed = baseSkeleton.seed || Math.floor(Math.random() * 1000000);
    const element: any = {
      ...baseSkeleton,
      id: elementId,
      x: baseSkeleton.x || 0,
      y: baseSkeleton.y || 0,
      width: baseSkeleton.width || 0,
      height: baseSkeleton.height || 0,
      angle: baseSkeleton.angle || 0,
      strokeColor: baseSkeleton.strokeColor || "#1e1e1e",
      backgroundColor: baseSkeleton.backgroundColor || "transparent",
      fillStyle: baseSkeleton.fillStyle || "solid",
      strokeWidth: baseSkeleton.strokeWidth || 2,
      strokeStyle: baseSkeleton.strokeStyle || "solid",
      roughness: baseSkeleton.roughness || 1,
      opacity: baseSkeleton.opacity || 100,
      groupIds: baseSkeleton.groupIds || [],
      roundness: baseSkeleton.roundness || null,
      seed,
      version: baseSkeleton.version || 1,
      versionNonce:
        baseSkeleton.versionNonce || Math.floor(Math.random() * 1000000),
      isDeleted: baseSkeleton.isDeleted ?? false,
      boundElements: baseSkeleton.boundElements || [],
      updated: baseSkeleton.updated || Date.now(),
      link: baseSkeleton.link || null,
      locked: baseSkeleton.locked ?? false,
      frameId: null,
      index: baseSkeleton.index || generateIndex(i),
    };

    if (label) {
      const textId = generateId();
      const fontSize = label.fontSize || 20;
      const text = label.text || "";

      // Rough estimation of text dimensions (Excalidraw normally does this in DOM)
      const textWidth = text.length * fontSize * 0.6;
      const textHeight = fontSize * 1.25;

      const textElement: ExcalidrawTextElement = {
        id: textId,
        type: "text",
        // Center text in container
        x: element.x + (element.width - textWidth) / 2,
        y: element.y + (element.height - textHeight) / 2,
        width: textWidth,
        height: textHeight,
        angle: 0,
        text,
        fontSize,
        fontFamily: label.fontFamily || 5,
        textAlign: label.textAlign || "center",
        verticalAlign: label.verticalAlign || "middle",
        containerId: elementId,
        strokeColor: label.strokeColor || element.strokeColor,
        backgroundColor: "transparent",
        fillStyle: "solid",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: label.groupIds || element.groupIds,
        seed: seed + 1,
        version: 1,
        versionNonce: Math.floor(Math.random() * 1000000),
        isDeleted: false,
        updated: Date.now(),
        link: null,
        locked: false,
        frameId: null,
        boundElements: [],
        originalText: text,
        autoResize: true,
        lineHeight: 1.25,
        index: element.index + "V",
      };

      element.boundElements = [
        ...(element.boundElements || []),
        { id: textId, type: "text" },
      ];

      elements.push(element);
      elements.push(textElement);
    } else {
      elements.push(element);
    }
  }

  return elements;
};
