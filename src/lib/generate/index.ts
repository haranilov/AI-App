/**
 * Public API for hook generation: orchestrator, templates, and utilities.
 */
export { generateHooks } from "@/lib/generate/generateHooks";
export { generateFromTemplates } from "@/lib/generate/templates";
export { isPlaceholderKey } from "@/lib/generate/isPlaceholderKey";
export type { GenerateMode, GenerateResult } from "@/lib/generate/types";
