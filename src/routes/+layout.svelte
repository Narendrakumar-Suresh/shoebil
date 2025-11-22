<script lang="ts">
	import './layout.css';
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { PanelLeft } from 'lucide-svelte';

	let { children } = $props();
</script>



{@render children()}

