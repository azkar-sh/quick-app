<script>
	import InboxContent from '$components/inboxContent.svelte';

	let showMenu = true;
	let taskMenu = false;
	let inboxMenu = true;

	let users = [];

	function handleTaskMenu() {
		taskMenu = !taskMenu;
		inboxMenu = false;
	}

	function handleInboxMenu() {
		inboxMenu = !inboxMenu;
		taskMenu = false;
	}

	function handleQuickMenu() {
		showMenu = !showMenu;
		taskMenu = false;
		inboxMenu = false;
	}
</script>

<div class="flex flex-row w-screen h-screen bg-main-background overflow-hidden">
	<div class="w-1/5 border-e"></div>
	<div class="flex flex-col justify-between w-4/5">
		<div class="flex">
			<img src="/icons/magnifying.svg" alt="" class="p-3 bg-primary-dark-grey w-10" />
			<input
				type="text"
				placeholder="Type here"
				class="input w-full rounded-none bg-primary-dark-grey focus:outline-none focus:ring-0 text-white"
			/>
		</div>

		<div class="self-end p-10 flex flex-col items-end gap-5">
			<!-- Quick Content -->

			<div
				class={`w-[734px] h-[737px] py-[24px] px-[32px] bg-white rounded-md flex flex-col gap-[22px]  ${
					taskMenu || inboxMenu ? 'visible' : 'hidden'
				}`}
			>
				{#if taskMenu}
					<span class="text-2xl">Task Content</span>
				{/if}

				{#if inboxMenu}
					<InboxContent />
				{/if}
			</div>

			<!-- Quick Menus -->
			<div class=" flex flex-row items-end gap-5">
				<div class={`show-menu ${showMenu ? 'visible' : 'hidden'}`}>
					{#if taskMenu}
						<button class="flex flex-col items-center gap-2 w-16" on:click={handleInboxMenu}>
							<img src="/icons/btn-inbox.svg" alt="" />
						</button>
						<button class="flex flex-col items-center gap-2 w-[72px]" on:click={handleTaskMenu}>
							<img src="/icons/btn-task-open.svg" alt="" />
						</button>
					{:else if inboxMenu}
						<button class="flex flex-col items-center gap-2 w-16" on:click={handleTaskMenu}>
							<img src="/icons/btn-task.svg" alt="" />
						</button>
						<button class="flex flex-col items-center gap-2 w-[72px]" on:click={handleInboxMenu}>
							<img src="/icons/btn-inbox-open.svg" alt="" />
						</button>
					{:else}
						<button class="flex flex-col items-center gap-2 w-16" on:click={handleTaskMenu}>
							<span class="text-white">Task</span>
							<img src="/icons/btn-task.svg" alt="" />
						</button>
						<button class="flex flex-col items-center gap-2 w-16" on:click={handleInboxMenu}>
							<span class="text-white">Inbox</span>
							<img src="/icons/btn-inbox.svg" alt="" />
						</button>
					{/if}
				</div>

				<button
					class={`z-10 w-16 ${taskMenu || inboxMenu ? 'hidden' : ''}`}
					on:click={handleQuickMenu}
				>
					<img src="/icons/btn-quick.svg" alt="" />
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.show-menu {
		display: flex;
		gap: 20px;
		transition:
			opacity 0.3s ease-out,
			transform 0.3s ease-out;
	}

	.show-menu.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.show-menu.hidden {
		opacity: 0;
		transform: translateX(100%);
	}
</style>
