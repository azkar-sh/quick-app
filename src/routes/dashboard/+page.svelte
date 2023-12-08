<script>
	let showMenu = false;
	let taskMenu = false;
	let inboxMenu = false;

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

		<div class="self-end p-12 flex flex-row items-end gap-5">
			<div class={`task-inbox ${showMenu ? 'visible' : 'hidden'}`}>
				<button class="flex flex-col items-center gap-2 w-16" on:click={handleInboxMenu}>
					<span class="text-white">Inbox</span>
					<img src="/icons/btn-inbox.svg" alt="" />
				</button>
				<button class="flex flex-col items-center gap-2 w-16" on:click={handleTaskMenu}>
					<span class="text-white">Task</span>
					<img src="/icons/btn-task.svg" alt="" />
				</button>
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

<style>
	.task-inbox {
		display: flex;
		gap: 20px;
		opacity: 0;
		transform: translateX(100%);
		transition:
			opacity 0.3s ease-out,
			transform 0.3s ease-out;
	}

	.task-inbox.visible {
		opacity: 1;
		transform: translateX(0);
	}
</style>
