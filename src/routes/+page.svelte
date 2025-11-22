<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as monaco from 'monaco-editor';
  import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import Sidebar from '$lib/components/Sidebar.svelte';

  let editor: monaco.editor.IStandaloneCodeEditor | null = null;
  let editorContainer: HTMLDivElement;
  let isLoading = true;
  let codeContent = '// Welcome to Shoebill Editor!\n// Start writing your code here...';
  let editorLanguage = 'javascript';

  onMount(() => {
    (self as any).MonacoEnvironment = {
      getWorker: (_: string, label: string) => {
        switch (label) {
          case 'json':
            return new JsonWorker();
          case 'css':
          case 'scss':
          case 'less':
            return new CssWorker();
          case 'html':
          case 'handlebars':
          case 'razor':
            return new HtmlWorker();
          case 'typescript':
          case 'javascript':
            return new TsWorker();
          default:
            return new EditorWorker();
        }
      },
    };

    editor = monaco.editor.create(editorContainer, {
      value: codeContent,
      language: editorLanguage,
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      fontFamily: 'Consolas, "Fira Code", monospace'
    });

    isLoading = false;
  });

  onDestroy(() => {
    editor?.dispose();
  });
</script>

<div class="h-screen w-full grid grid-cols-[auto_1fr] bg-gray-900">
  <Sidebar />

  <div class="relative h-full w-full">
    {#if isLoading}
      <div class="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
        <p class="text-xl text-yellow-400 animate-pulse">Loading Shoebill Editor...</p>
      </div>
    {/if}

    <div bind:this={editorContainer} class="h-full w-full"></div>
  </div>
</div>