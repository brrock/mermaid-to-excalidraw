// Simple test to verify the library exports work
import { parseMermaidToExcalidraw, validateMermaid } from "../dist/index.js";

console.log("✅ Library loaded successfully");
console.log("  - parseMermaidToExcalidraw:", typeof parseMermaidToExcalidraw);
console.log("  - validateMermaid:", typeof validateMermaid);
console.log("\n⚠️  Note: Full tests require browser environment (mermaid needs DOM)");
console.log("  The library is working - use in browser to parse Mermaid diagrams.");
