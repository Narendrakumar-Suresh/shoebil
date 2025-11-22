// This file provides necessary type declarations for external modules 
// that TypeScript might fail to automatically resolve in the Svelte/Vite context.

// --- MONACO DECLARATIONS ---
declare module 'monaco-editor';
declare module 'monaco-editor' {
    export * from 'monaco-editor/esm/vs/editor/editor.api';
}
// ---------------------------

// --- LUCIDE-SVELTE DECLARATION FIX ---
// This explicit declaration tells TypeScript that the 'lucide-svelte' module exists.
declare module 'lucide-svelte' {
    export * from 'lucide-svelte/icons';
}
// -------------------------------------