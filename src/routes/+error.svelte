<script>
	import Icon from '@iconify/svelte';
</script>

<main class=" bg-primary-cream">
	<Icon icon="mdi:alert-circle-outline" width="100" height="100" />
	<h1>Oops! The Page You Requested is Unavailable</h1>
	<p>Taking You Back to the Dashboard...</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		font-family: Arial, sans-serif;
	}

	h1 {
		font-size: 20px;
		margin-bottom: 5px;
		font-weight: bold;
	}

	p {
		font-size: 1.2rem;
	}
</style>
