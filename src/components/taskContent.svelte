<script>
	import Icon from '@iconify/svelte';
	import todo from '$json/todo.json';
	import { onMount } from 'svelte';

	let datas = [];
	let isLoadingData = false;
	let editDescription = false;
	let editDescriptionId = 0;
	let addTask = false;
	let showDetail = false;
	let showDetailId = 0;

	function handleEditDescription(id) {
		editDescriptionId = id;
		if (editDescriptionId === id) {
			editDescription = !editDescription;
		}
	}

	function handleShowDetail(id) {
		showDetailId = id;
		if (showDetailId === id) {
			showDetail = !showDetail;
		}
	}

	function handleShowAddTask() {
		addTask = !addTask;
	}

	onMount(() => {
		isLoadingData = true;
		setTimeout(() => {
			isLoadingData = false;
			datas = todo;
		}, 2000);
	});
</script>

<div class="flex justify-between">
	<select class="select select-bordered select-md max-w-xs ms-10">
		<option selected>My Tasks</option>
		<option>Personal Errands</option>
		<option>Urgent To-Do</option>
	</select>
	<button class="btn bg-primary-blue text-white border-0" on:click={handleShowAddTask}
		>New Task</button
	>
</div>

{#if isLoadingData}
	<div class="flex flex-col items-center justify-center m-auto gap-4">
		<Icon icon="line-md:loading-twotone-loop" width="64" />
		<span class="">Loading Task List ...</span>
	</div>
{:else}
	<div
		class="overflow-y-auto overflow-x-hidden flex flex-col gap-[22px] animate__animated animate__fadeIn"
	>
		{#each datas as data, i}
			<div class="flex flex-row items-start gap-2">
				<input
					type="checkbox"
					checked={data.task_complete ? 'checked' : ''}
					class="checkbox border-black rounded-sm w-5 h-5 mt-1 [--chkfg:#828282] [--chkbg:#fff] checked:border-primary-light-grey"
				/>
				<div class="w-full">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						tabindex="0"
						class={`collapse ${data.task_complete ? '' : 'collapse-open'}`}
						on:click={handleShowDetail(data.task_id)}
					>
						<div class="collapse-title flex justify-between items-start py-0 px-0 min-h-0">
							<span
								class={`w-2/4 font-semibold ${
									data.task_complete ? 'line-through text-primary-light-grey' : ''
								}`}>{data.task_title}</span
							>
							<div class="flex items-center gap-4 me-2">
								<span class="text-sm text-indicator-red">{data.task_due}</span>
								<span>{data.task_date}</span>
								{#if showDetailId === data.task_id || data.task_complete === false}
									<Icon icon="iconamoon:arrow-down-2-bold" width="20" />
								{:else}
									<Icon icon="iconamoon:arrow-up-2-bold" width="20" />
								{/if}
								<div class="dropdown dropdown-bottom dropdown-end">
									<div tabindex="0" role="button" class="">
										<Icon icon="tabler:dots" width="24" />
									</div>
									<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
									<ul
										tabindex="0"
										class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
									>
										<li><span class="text-indicator-red">Delete</span></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="collapse-content flex flex-col gap-4 mt-4">
							<div class="flex flex-row gap-2">
								<Icon icon="mingcute:time-line" width="20" class="text-primary-blue" />
							</div>
							<div class="flex flex-row gap-2">
								<button class="p-0 h-0" on:click={handleEditDescription(data.task_id)}>
									<Icon icon="material-symbols:edit" width="20" class="text-primary-blue" />
								</button>
								{#if editDescriptionId === data.task_id}
									<textarea
										class="textarea w-5/6 leading-5 textarea-bordered border-primary-light-grey placeholder:text-black focus:border-white rounded"
										rows="3"
										placeholder={data.task_description ? data.task_description : 'No Description'}
									></textarea>
								{:else}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<span
										class="w-5/6 text-sm leading-5 ps-1"
										on:click={handleEditDescription(data.task_id)}
										>{data.task_description ? data.task_description : 'No Description'}</span
									>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
			{#if i !== datas.length - 1}
				<hr />
			{/if}
		{/each}
		{#if addTask}
			<hr />
			<div class="flex flex-col gap-4 mb-10">
				<div class="flex flex-row items-start justify-between">
					<div class="flex flex-row items-start gap-6">
						<input
							type="checkbox"
							class="checkbox border-black rounded-sm w-5 h-5 mt-1 [--chkfg:#828282] [--chkbg:#fff] checked:border-primary-light-grey"
						/>
						<input type="text" placeholder="Type Task Title" class="input input-bordered rounded" />
					</div>
					<div class="flex items-center gap-4 me-2">
						<Icon icon="iconamoon:arrow-up-2-bold" width="20" />
						<div class="dropdown dropdown-bottom dropdown-end">
							<div tabindex="0" role="button" class="">
								<Icon icon="tabler:dots" width="24" />
							</div>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<ul
								tabindex="0"
								class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li><span class="text-indicator-red">Delete</span></li>
							</ul>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-4 ms-10">
					<div class="flex flex-row gap-2">
						<Icon icon="mingcute:time-line" width="20" class="text-primary-blue" />
					</div>
					<div class="flex flex-row gap-2">
						<button class="p-0 h-0">
							<Icon icon="material-symbols:edit" width="20" class="text-primary-blue" />
						</button>

						<textarea
							class="textarea w-5/6 leading-5 textarea-bordered border-primary-light-grey placeholder:text-black focus:border-white rounded"
							rows="3"
							placeholder="Add Description"
						></textarea>
					</div>
				</div>

				<div class="ms-10">
					<button class="btn bg-primary-blue text-white border-0">Add Task</button>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	/* your styles go here */
</style>
