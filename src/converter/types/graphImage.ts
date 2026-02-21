import { GraphConverter } from "../GraphConverter";
import { generateId } from "../../types";
import {
  FileId,
  ExcalidrawElementSkeleton,
  BinaryFiles,
} from "../../types/excalidraw";
import { GraphImage } from "../../interfaces";

export const GraphImageConverter = new GraphConverter<GraphImage>({
  converter: (graph) => {
    const imageId = generateId() as FileId;

    const { width, height } = graph;
    const imageElement: ExcalidrawElementSkeleton = {
      type: "image",
      x: 0,
      y: 0,
      width,
      height,
      status: "saved",
      fileId: imageId,
    };
    const files = {
      [imageId]: {
        id: imageId,
        mimeType: graph.mimeType,
        dataURL: graph.dataURL,
      },
    } as BinaryFiles;
    return { files, elements: [imageElement] };
  },
});
