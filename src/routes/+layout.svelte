<script>
	import '../app.css';
	import 'flatpickr/dist/flatpickr.css';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	onMount(() => {
		if (window.location.href.indexOf('dashboard') === -1) {
			toast.push('Redirecting . . . ', {
				duration: 3000
			});
			setTimeout(() => {
				window.location.href = '/dashboard';
			}, 3000);
		}
	});
</script>

<slot />
<SvelteToast />

<style>
	:root {
		--toastWidth: 400px;
		--toastBackground: #fff;
		--toastColor: #ff0000;
		--toastBarBackground: #ff0000;
	}
</style>
