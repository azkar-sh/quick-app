<script>
	import Icon from '@iconify/svelte';
	import todo from '$json/todo.json';
	import tags from '$json/tag.json';
	import { onMount } from 'svelte';
	import Flatpickr from 'svelte-flatpickr';

	let datas = [];
	let tagsData = [];

	let isLoadingData = false;
	let editDescription = false;
	let editDescriptionId = 0;
	let addTask = false;
	let showDetail = false;
	let showDetailId = 0;
	let showTagsList = false;
	let showTagsListId = 0;
	let showTagsListChoice = false;
	let taggedData = [];

	function fetchTodoList() {
		isLoadingData = true;
		setTimeout(() => {
			datas = todo;
			tagsData = tags;
			isLoadingData = false;
		}, 2000);
	}

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

		if (addTask) {
			const addTaskSection = document.getElementById('add-task-section');

			addTaskSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest'
			});
		}
	}

	function handleShowTagsList(id) {
		showTagsListId = id;
		if (showTagsListId === id) {
			showTagsList = !showTagsList;
		}
	}

	function handleConvertEpoch(epoch, format) {
		let date = new Date(epoch * 1000);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let min = date.getMinutes();
		let sec = date.getSeconds();
		let time = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
		if (format === 'date') {
			return `${day}/${month}/${year}`;
		} else {
			return time;
		}
	}

	onMount(() => {
		fetchTodoList();
	});
</script>

<div class="flex justify-between">
	<select class="select select-bordered select-md max-w-xs ms-10">
		<option selected>My Tasks</option>
		<option>Personal Errands</option>
		<option>Urgent To-Do</option>
	</select>
	<button
		class="btn bg-primary-blue text-white border-0 hover:bg-blue-400"
		on:click={handleShowAddTask}>New Task</button
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
								<span>{handleConvertEpoch(data.task_date, 'date')}</span>
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

						<div class="collapse-content flex flex-col gap-4 mt-4 z-10">
							<!-- Due Date -->
							<div class="flex flex-row gap-4 items-center p-2">
								<Icon icon="mingcute:time-line" width="20" class="text-primary-blue" />
								<div class="flex flex-row items-center border rounded">
									<Flatpickr
										class="input focus:border-white focus:outline-none"
										options={{
											dateFormat: 'Y-m-d',
											altFormat: 'Y-m-d',
											time_24hr: true,
											defaultDate: handleConvertEpoch(data.task_date)
										}}
									/>
									<Icon icon="uil:calender" width="20" class="text-primary-light-grey me-2" />
								</div>
							</div>

							<!-- Description -->
							<div class="flex flex-row gap-4 p-2">
								<button class="p-0 h-0" on:click={handleEditDescription(data.task_id)}>
									<Icon icon="material-symbols:edit" width="20" class="text-primary-blue" />
								</button>
								{#if editDescriptionId === data.task_id && data.task_complete === false}
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

							<!-- Tags -->
							<div class="flex flex-row gap-4 items-center bg-gray-100 p-2 rounded-md relative">
								<button
									on:click={() => {
										handleShowTagsList(data.task_id);
									}}
								>
									<Icon
										icon="fluent:bookmark-multiple-16-regular"
										width="20"
										class="text-primary-blue"
									/>
								</button>
								{#if showTagsListId === data.task_id && data.task_complete === false && showTagsList}
									<div
										class={`absolute flex flex-col justify-center bottom-12 gap-1 p-1 rounded-md bg-white shadow-md border-2 border-gray-50 h-[180px] flex-wrap`}
									>
										{#each tagsData as tag}
											<div class="tag-checkbox">
												<input type="checkbox" id="tags-{tag.tag_id}" />
												<label for="tags-{tag.tag_id}" class="">
													{#if tag.tag_id === 1}
														<div
															class="bg-blue-100 px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
														>
															<span class=" text-sm">{tag.tag_name}</span>
														</div>
													{:else if tag.tag_id === 2}
														<div
															class="bg-sticker-orange px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
														>
															<span class=" text-sm">{tag.tag_name}</span>
														</div>
													{:else if tag.tag_id === 3}
														<div
															class="bg-sticker-light-orange px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
														>
															<span class=" text-sm">{tag.tag_name}</span>
														</div>
													{:else if tag.tag_id === 4}
														<div
															class="bg-sticker-blue px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
														>
															<span class=" text-sm">{tag.tag_name}</span>
														</div>
													{:else if tag.tag_id === 5}
														<div
															class="bg-sticker-green px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
														>
															<span class=" text-sm">{tag.tag_name}</span>
														</div>
													{:else if tag.tag_id === 6}
														<div
															class="bg-sticker-purple px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
														>
															<span class=" text-sm">{tag.tag_name}</span>
														</div>
													{:else if tag.tag_id === 7}
														<div
															class="bg-sticker-light-purple px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
														>
															<span class=" text-sm">{tag.tag_name}</span>
														</div>
													{:else if tag.tag_id === 8}
														<div
															class="bg-blue-300 px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
														>
															<span class=" text-sm">{tag.tag_name}</span>
														</div>
													{/if}
												</label>
											</div>
										{/each}
									</div>
								{/if}

								<div class="flex flex-row items-center gap-2">
									{#if data.task_tags.length > 0}
										{#each data.task_tags as tag}
											{#if tag.tag_id === 1}
												<span class="bg-blue-100 px-3 py-1 rounded-md">{tag.tag_name}</span>
											{:else if tag.tag_id === 2}
												<span class="bg-sticker-orange px-3 py-1 rounded-md">{tag.tag_name}</span>
											{:else if tag.tag_id === 3}
												<span class="bg-sticker-light-orange px-3 py-1 rounded-md"
													>{tag.tag_name}</span
												>
											{:else if tag.tag_id === 4}
												<span class="bg-sticker-blue px-3 py-1 rounded-md">{tag.tag_name}</span>
											{:else if tag.tag_id === 5}
												<span class="bg-sticker-green px-3 py-1 rounded-md">{tag.tag_name}</span>
											{:else if tag.tag_id === 6}
												<span class="bg-sticker-purple px-3 py-1 rounded-md">{tag.tag_name}</span>
											{:else if tag.tag_id === 7}
												<span class="bg-sticker-light-purple px-3 py-1 rounded-md"
													>{tag.tag_name}</span
												>
											{:else if tag.tag_id === 8}
												<span class="bg-blue-300 px-3 py-1 rounded-md">{tag.tag_name}</span>
											{/if}
										{/each}
									{:else}
										<span class="text-sm text-primary-blue">No Tags</span>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{#if i !== datas.length - 1}
				<hr />
			{/if}
		{/each}

		<div id="add-task-section">
			<hr class="mb-[22px]" />
			<div class="flex flex-col gap-4 mb-32">
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
					<div class="flex flex-row gap-4 items-center">
						<Icon icon="mingcute:time-line" width="20" class="text-primary-blue" />
						<Flatpickr
							class="input input-bordered rounded p-3"
							options={{
								enableTime: true,
								dateFormat: 'Y-m-d',
								time_24hr: true,
								defaultDate: new Date()
							}}
						/>
					</div>
					<div class="flex flex-row gap-4">
						<button class="p-0 h-0">
							<Icon icon="material-symbols:edit" width="20" class="text-primary-blue" />
						</button>

						<textarea
							class="textarea w-5/6 leading-5 textarea-bordered border-primary-light-grey placeholder:text-black focus:border-white rounded"
							rows="3"
							placeholder="Add Description"
						></textarea>
					</div>

					<div class="flex flex-row items-center bg-gray-100 p-2 rounded-md">
						<div class="relative">
							<div class="flex items-center gap-2">
								<button
									on:click={() => {
										showTagsListChoice = !showTagsListChoice;
									}}
								>
									<Icon
										icon="fluent:bookmark-multiple-16-regular"
										width="20"
										class="text-primary-blue"
									/>
								</button>
								<span>Add tag</span>
							</div>
							{#if showTagsListChoice}
								<div
									class={`absolute flex flex-col justify-center bottom-12 gap-1 p-1 rounded-md bg-white shadow-md border-2 border-gray-50 h-[180px] w-max flex-wrap`}
								>
									{#each tagsData as tag}
										<div class="tag-checkbox">
											<input type="checkbox" id="tags-{tag.tag_id}" />
											<label for="tags-{tag.tag_id}" class="">
												{#if tag.tag_id === 1}
													<div
														class="bg-blue-100 px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
													>
														<span class=" text-sm">{tag.tag_name}</span>
													</div>
												{:else if tag.tag_id === 2}
													<div
														class="bg-sticker-orange px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
													>
														<span class=" text-sm">{tag.tag_name}</span>
													</div>
												{:else if tag.tag_id === 3}
													<div
														class="bg-sticker-light-orange px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
													>
														<span class=" text-sm">{tag.tag_name}</span>
													</div>
												{:else if tag.tag_id === 4}
													<div
														class="bg-sticker-blue px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
													>
														<span class=" text-sm">{tag.tag_name}</span>
													</div>
												{:else if tag.tag_id === 5}
													<div
														class="bg-sticker-green px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
													>
														<span class=" text-sm">{tag.tag_name}</span>
													</div>
												{:else if tag.tag_id === 6}
													<div
														class="bg-sticker-purple px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
													>
														<span class=" text-sm">{tag.tag_name}</span>
													</div>
												{:else if tag.tag_id === 7}
													<div
														class="bg-sticker-light-purple px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
													>
														<span class=" text-sm">{tag.tag_name}</span>
													</div>
												{:else if tag.tag_id === 8}
													<div
														class="bg-blue-300 px-3 py-[2px] rounded-md border-transparent border-2 w-[150px]"
													>
														<span class=" text-sm">{tag.tag_name}</span>
													</div>
												{/if}
											</label>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>

				<div class="ms-10">
					<button class="btn bg-primary-blue text-white border-0 hover:bg-blue-400">Add Task</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.tag-checkbox {
		position: relative;
		cursor: pointer;
		border: 2px solid transparent;
	}

	.tag-checkbox input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		cursor: pointer;
	}

	.tag-checkbox label {
		display: inline-block;
		background-color: #ebf4ff;
		border-radius: 0.375rem;
	}

	.tag-checkbox input:checked + label {
		filter: contrast(1.3);
		border: 1px solid blue;
	}
</style>
