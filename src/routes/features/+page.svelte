<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/features/selection-modes', { replaceState: true });
	});
</script>
