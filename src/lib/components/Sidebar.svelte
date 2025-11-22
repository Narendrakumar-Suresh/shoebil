<script lang="ts">
  export const csr = true;
  import { Files, Search, GitBranch, Settings, Box, GripVertical } from 'lucide-svelte';
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  let activePanel: string | null = $state(null);
  let panelWidth = $state(240);
  let isResizing = $state(false);

  function toggle(panel: string) {
    activePanel = activePanel === panel ? null : panel;
  }

  function startResize(e: MouseEvent) {
    isResizing = true;
    const startX = e.clientX;
    const startWidth = panelWidth;

    function onMouseMove(e: MouseEvent) {
      const newWidth = startWidth + (e.clientX - startX);
      panelWidth = Math.max(150, Math.min(500, newWidth));
    }

    function onMouseUp() {
      isResizing = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
</script>

<div class="h-full flex">
  <!-- Icon Bar -->
  <div class="w-12 bg-[#333333] flex flex-col items-center py-2 gap-1">
    <button 
      class="p-2 rounded {activePanel === 'files' ? 'bg-[#505050] text-white' : 'text-gray-400 hover:text-white hover:bg-[#505050]'}"
      onclick={() => toggle('files')}
    >
      <Files size={24} />
    </button>

    <button 
      class="p-2 rounded {activePanel === 'search' ? 'bg-[#505050] text-white' : 'text-gray-400 hover:text-white hover:bg-[#505050]'}"
      onclick={() => toggle('search')}
    >
      <Search size={24} />
    </button>

    <button 
      class="p-2 rounded {activePanel === 'git' ? 'bg-[#505050] text-white' : 'text-gray-400 hover:text-white hover:bg-[#505050]'}"
      onclick={() => toggle('git')}
    >
      <GitBranch size={24} />
    </button>

    <button 
      class="p-2 rounded {activePanel === 'extensions' ? 'bg-[#505050] text-white' : 'text-gray-400 hover:text-white hover:bg-[#505050]'}"
      onclick={() => toggle('extensions')}
    >
      <Box size={24} />
    </button>

    <div class="mt-auto">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="p-2 rounded text-gray-400 hover:text-white hover:bg-[#505050]">
          <Settings size={24} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56 bg-[#252526] border-[#3c3c3c] text-white" align="start" side="right">
          <DropdownMenu.Label>Settings</DropdownMenu.Label>
          <DropdownMenu.Separator class="bg-[#3c3c3c]" />
          <DropdownMenu.Group>
            <DropdownMenu.Item class="hover:bg-[#3c3c3c] focus:bg-[#3c3c3c]">
              Theme
              <DropdownMenu.Shortcut>⌘T</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item class="hover:bg-[#3c3c3c] focus:bg-[#3c3c3c]">
              Font Size
              <DropdownMenu.Shortcut>⌘+/-</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item class="hover:bg-[#3c3c3c] focus:bg-[#3c3c3c]">
              Keyboard Shortcuts
              <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator class="bg-[#3c3c3c]" />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger class="hover:bg-[#3c3c3c] focus:bg-[#3c3c3c]">Editor</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent class="bg-[#252526] border-[#3c3c3c] text-white">
              <DropdownMenu.Item class="hover:bg-[#3c3c3c] focus:bg-[#3c3c3c]">Word Wrap</DropdownMenu.Item>
              <DropdownMenu.Item class="hover:bg-[#3c3c3c] focus:bg-[#3c3c3c]">Minimap</DropdownMenu.Item>
              <DropdownMenu.Item class="hover:bg-[#3c3c3c] focus:bg-[#3c3c3c]">Line Numbers</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator class="bg-[#3c3c3c]" />
          <DropdownMenu.Item class="hover:bg-[#3c3c3c] focus:bg-[#3c3c3c]">About</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>

  <!-- Resizable Side Panel -->
  {#if activePanel}
    <div 
      class="bg-[#252526] border-r border-[#3c3c3c] text-white p-3 relative select-none"
      style="width: {panelWidth}px"
    >
      {#if activePanel === 'files'}
        <h3 class="text-xs font-semibold uppercase text-gray-400 mb-3">Explorer</h3>
        <div class="text-sm space-y-1">
          <p class="px-2 py-1 hover:bg-[#3c3c3c] rounded cursor-pointer">📁 src</p>
          <p class="px-2 py-1 hover:bg-[#3c3c3c] rounded cursor-pointer pl-6">📄 +page.svelte</p>
          <p class="px-2 py-1 hover:bg-[#3c3c3c] rounded cursor-pointer pl-6">📄 +layout.svelte</p>
          <p class="px-2 py-1 hover:bg-[#3c3c3c] rounded cursor-pointer">📁 lib</p>
          <p class="px-2 py-1 hover:bg-[#3c3c3c] rounded cursor-pointer">📄 package.json</p>
        </div>
      {:else if activePanel === 'search'}
        <h3 class="text-xs font-semibold uppercase text-gray-400 mb-3">Search</h3>
        <input 
          type="text" 
          placeholder="Search..." 
          class="w-full bg-[#3c3c3c] text-white px-3 py-1.5 text-sm rounded border border-[#505050] focus:outline-none focus:border-blue-500"
        />
      {:else if activePanel === 'git'}
        <h3 class="text-xs font-semibold uppercase text-gray-400 mb-3">Source Control</h3>
        <p class="text-sm">Branch: main</p>
        <p class="text-sm text-yellow-400 mt-2">2 pending changes</p>
      {:else if activePanel === 'extensions'}
        <h3 class="text-xs font-semibold uppercase text-gray-400 mb-3">Extensions</h3>
        <input 
          type="text" 
          placeholder="Search extensions..." 
          class="w-full bg-[#3c3c3c] text-white px-3 py-1.5 text-sm rounded border border-[#505050] focus:outline-none focus:border-blue-500"
        />
      {/if}

      <!-- Resize Handle -->
      <div 
        class="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-blue-500 {isResizing ? 'bg-blue-500' : 'bg-transparent'}"
        onmousedown={startResize}
      ></div>
    </div>
  {/if}
</div>