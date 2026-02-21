declare module "mermaid/dist/Diagram" {
  export default interface Diagram {
    type: string;
    parser: unknown;
    renderer: unknown;
    parse: () => void;
  }
}

declare module "mermaid/dist/diagram-api/types" {
  export interface DiagramStyleClassDef {
    id: string;
    styles?: string[];
    textStyles?: string[];
  }
}

declare module "mermaid/dist/diagrams/class/classTypes" {
  export interface ClassNode {
    id: string;
    type: string;
    label: string;
    cssClasses?: string[];
    methods?: string[];
    fields?: string[];
    annotations?: string[];
    domId?: string;
    width?: number;
    height?: number;
  }

  export interface ClassRelation {
    id1: string;
    id2: string;
    relation: { type1: string; type2: string; lineType: number };
    title?: string;
    relationTitle1?: string;
    relationTitle2?: string;
  }

  export interface ClassNote {
    id: string;
    text: string;
    class?: string;
  }

  export interface NamespaceNode {
    id: string;
    children?: ClassNode[];
    classes?: ClassNode[];
  }
}

declare module "mermaid/dist/diagrams/sequence/sequenceTypes" {
  export interface Actor {
    name: string;
    description: string;
    type: string;
  }

  export interface Message {
    from: string;
    to: string;
    message: string;
    type: number;
    id?: string;
  }

  export interface Loop {
    type: string;
    message: string;
    startTime?: number;
    endTime?: number;
    loopNum?: number;
  }
}
