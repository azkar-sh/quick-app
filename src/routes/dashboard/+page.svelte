<script>
	import InboxContent from '$components/inboxContent.svelte';
	import TaskContent from '$components/taskContent.svelte';

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
				placeholder=""
				class="input w-full rounded-none bg-primary-dark-grey focus:outline-none focus:ring-0 text-white"
			/>
		</div>

		<div class="self-end md:p-10 p-3 flex flex-col items-end gap-5">
			<!-- Quick Content -->
			<div
				class={`md:w-[734px] md:h-[737px] w-[370px] h-[500px] py-[24px] px-[32px] bg-white rounded-md flex flex-col gap-[22px]  ${
					taskMenu || inboxMenu ? 'visible animate__animated animate__zoomIn' : 'hidden '
				}`}
			>
				{#if taskMenu}
					<TaskContent />
				{/if}

				{#if inboxMenu}
					<InboxContent />
				{/if}
			</div>

			<!-- Quick Menus -->
			<div class=" flex flex-row items-end gap-5">
				<div class={`show-menu ${showMenu ? 'visible' : 'hidden'}`}>
					{#if taskMenu}
						<button
							class="flex flex-col items-center gap-2 w-16 hover:contrast-75 active:scale-90 animate__animated animate__zoomIn"
							on:click={handleInboxMenu}
							disabled={!showMenu}
						>
							<img src="/icons/btn-inbox.svg" alt="" />
						</button>
						<button
							class="flex flex-col items-center gap-2 w-[72px] hover:contrast-75 active:scale-90 animate__animated animate__slideInLeft"
							on:click={handleTaskMenu}
							disabled={!showMenu}
						>
							<img src="/icons/btn-task-open.svg" alt="" />
						</button>
					{:else if inboxMenu}
						<button
							class="flex flex-col items-center gap-2 w-16 hover:contrast-75 active:scale-90 animate__animated animate__zoomIn"
							on:click={handleTaskMenu}
							disabled={!showMenu}
						>
							<img src="/icons/btn-task.svg" alt="" />
						</button>
						<button
							class="flex flex-col items-center gap-2 w-[72px] hover:contrast-75 active:scale-90 animate__animated animate__slideInLeft"
							on:click={handleInboxMenu}
							disabled={!showMenu}
						>
							<img src="/icons/btn-inbox-open.svg" alt="" />
						</button>
					{:else}
						<button
							class="flex flex-col items-center gap-2 w-16 hover:contrast-75 active:scale-90 animate__animated animate__slideInRight"
							on:click={handleTaskMenu}
							disabled={!showMenu}
						>
							<span class="text-white">Task</span>
							<img src="/icons/btn-task.svg" alt="" />
						</button>
						<button
							class="flex flex-col items-center gap-2 w-16 hover:contrast-75 active:scale-90 animate__animated animate__slideInRight"
							on:click={handleInboxMenu}
							disabled={!showMenu}
						>
							<span class="text-white">Inbox</span>
							<img src="/icons/btn-inbox.svg" alt="" />
						</button>
					{/if}
				</div>

				<button
					class={`z-10 w-16 active:scale-90 ${taskMenu || inboxMenu ? 'hidden' : ''}`}
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
