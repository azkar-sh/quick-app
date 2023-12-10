<script>
	import Icon from '@iconify/svelte';
	import users from '$json/message.json';
	import { onMount } from 'svelte';

	let datas = [];
	let roomId = 0;
	let isMessageLoading = false;
	let replyMessage = '';
	let replyUser = '';

	let messages = [];

	function getMessages(roomId) {
		messages = [];
		isMessageLoading = true;
		datas.forEach((data) => {
			if (data.room_id === roomId) {
				messages = data.messages;
			}
		});
		setTimeout(() => {
			isMessageLoading = false;
		}, 2000);
	}

	function reply(message, user) {
		replyMessage = message;
		replyUser = user;
	}

	onMount(() => {
		isMessageLoading = true;
		setTimeout(() => {
			isMessageLoading = false;
			datas = users;
		}, 2000);
	});
</script>

{#if roomId === 0}
	<div
		class="border-[1px] border-primary-light-grey rounded-[5px] w-full h-[40px] py-[10px] px-[12px] flex items-center justify-center gap-4"
	>
		<span>Search</span>
		<input type="text" class="w-[350px] h-full outline-none" />
		<Icon icon="ph:magnifying-glass-bold" />
	</div>
	{#if isMessageLoading}
		<div class="flex flex-col items-center justify-center m-auto gap-4">
			<Icon icon="line-md:loading-twotone-loop" width="64" />
			<span class="">Loading Chats ...</span>
		</div>
	{:else}
		{#each datas as data, i}
			<div
				class="flex gap-4 items-start animate__animated animate__fadeIn"
				role="button"
				tabindex="0"
				on:click={() => {
					roomId = data.room_id;
					getMessages(data.room_id);
				}}
				on:keydown={() => {
					roomId = data.room_id;
					getMessages(data.room_id);
				}}
			>
				<img src="/icons/user-group.svg" alt="" />
				<div class="flex flex-col">
					<div class="flex gap-4">
						<span class=" text-primary-blue font-semibold">{data.title}</span>
						<span class=" text-black">{data.date}</span>
					</div>
					<span class="text-black font-semibold text-sm">{data.user ? `${data.user} :` : ''}</span>
					<span class="text-black">{data.latest_message}</span>
				</div>
			</div>

			{#if i !== datas.length - 1}
				<hr class="border-[1px] border-primary-light-grey w-full" />
			{/if}
		{/each}
	{/if}
{/if}

<!-- Room Content -->
{#if roomId !== 0}
	<div class="flex justify-between animate__animated animate__fadeIn">
		<div class="flex gap-4">
			<button on:click={() => (roomId = 0)}>
				<Icon icon="ph:arrow-left-bold" width="24" />
			</button>
			<div class="flex flex-col">
				<span class="text-primary-blue font-bold text-base">{datas[roomId - 1].title}</span>
				<span class="text-black"
					>{datas[roomId - 1].total_participants !== 0
						? `${datas[roomId - 1].total_participants} Participants`
						: ''}</span
				>
			</div>
		</div>
		<button class=" ms-7" on:click={() => (roomId = 0)}>
			<Icon icon="ic:round-close" width="24" />
		</button>
	</div>
	<hr />
	{#if isMessageLoading}
		<div class="flex flex-col items-center justify-center m-auto gap-4">
			<Icon icon="line-md:loading-twotone-loop" width="48" />
			<span class="">Loading Chats ...</span>
		</div>
	{:else if messages.length > 0}
		<div
			class="overflow-y-auto overflow-x-hidden flex flex-col gap-4 h-full animate__animated animate__fadeIn"
		>
			{#each messages as message, i}
				<div class="flex flex-col">
					{#if message.user_id === 1}
						<div class="flex flex-col items-end self-end max-w-md w-fit">
							<span class="text-chat-purple-hover">You</span>

							<div class="flex flex-col gap-2">
								{#if message.reply && message.reply.message}
									<div class=" bg-primary-cream border border-grey-300 rounded-md p-2">
										<span>{message.reply.message ? message.reply.message : ''}</span>
									</div>
								{/if}
								<div class="flex flex-row-reverse gap-2">
									<div class="flex flex-col bg-chat-purple p-2 rounded">
										<span>{message.message}</span>
										<span>{message.date}</span>
									</div>
									<div class="dropdown">
										<div tabindex="0" role="button" class="">
											<Icon icon="tabler:dots" width="24" />
										</div>
										<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
										<ul
											tabindex="0"
											class="dropdown-content z-[1] menu p-2 shadow bg-base-100 border-primary-light-grey rounded-md w-28"
										>
											<li><span class=" text-primary-blue hover:bg-blue-50">Edit</span></li>

											<li><span class="text-indicator-red hover:bg-red-50">Delete</span></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					{:else if message.user_id !== 1 && message.user_id !== 0}
						<div class="flex flex-col self-start max-w-md w-fit">
							<span
								class={`${
									message.user_id === 2 ? 'text-chat-yellow-hover' : 'text-chat-green-hover'
								}`}>{message.user}</span
							>
							<div class="flex gap-2">
								<div
									class={`flex flex-col p-2 rounded ${
										message.user_id === 2
											? 'bg-chat-yellow'
											: message.user_id === 3
											  ? 'bg-chat-green'
											  : ' bg-gray-100'
									}`}
								>
									<span>{message.message}</span>
									<span>{message.date}</span>
								</div>
								<div class="dropdown dropdown-end">
									<div tabindex="0" role="button" class="">
										<Icon icon="tabler:dots" width="24" />
									</div>
									<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
									<ul
										tabindex="0"
										class="dropdown-content z-[1] menu p-2 shadow border-primary-light-grey bg-base-100 rounded-md w-28"
									>
										<li><span class=" text-primary-blue hover:bg-blue-50">Share</span></li>
										<hr />
										<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
										<li
											on:click={reply(message.message, message.user)}
											on:keydown={reply(message.message, message.user)}
										>
											<span class=" text-primary-blue hover:bg-blue-50">Reply</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					{/if}
					{#if message.user_id === 0}
						<div class="flex gap-4 items-center">
							<hr class="border-[1px] border-primary-light-grey w-full" />
							<span class="font-bold w-full text-center">{message.date}</span>
							<hr class="border-[1px] border-primary-light-grey w-full" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
		{#if datas[roomId - 1].room_id === 4}
			<div class="flex gap-4 bg-blue-100 p-[10px] rounded">
				<Icon icon="line-md:loading-twotone-loop" width="24" />
				<span>Please wait while we connect you with one of our team ...</span>
			</div>
		{/if}
		<div class="flex gap-4 items-end">
			<div class="w-full">
				{#if replyMessage && replyUser}
					<div
						class="flex flex-col gap-1 bg-primary-cream p-3 rounded-t-md border-t border-x border-black animate__animated animate__fadeIn"
					>
						<div class="flex justify-between">
							<span class=" text-primary-dark-grey font-semibold"
								>{replyUser ? `Replying to ${replyUser}` : ''}</span
							>
							<button
								class=""
								on:click={() => {
									replyMessage = '';
									replyUser = '';
								}}
							>
								<Icon icon="ic:round-close" width="24" />
							</button>
						</div>
						<span class="text-primary-dark-grey">{replyMessage ? replyMessage : ''}</span>
					</div>
				{/if}
				<input
					type="text"
					placeholder="Add Text ..."
					class={`input input-bordered py-3 px-4 w-full  ${
						replyMessage && replyUser ? 'rounded-t-none' : ''
					}`}
				/>
			</div>
			<button class="btn btn-primary text-white px-[16px] py-[8px]">Send</button>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center m-auto gap-4">
			<Icon icon="bx:bxs-message-square-x" width="64" />
			<span class="">No messages yet</span>
		</div>
		<div class="flex gap-4">
			<input type="text" placeholder="Add Text ..." class="input input-bordered py-3 px-4 w-full" />
			<button class="btn btn-primary text-white px-[16px] py-[8px]">Send</button>
		</div>
	{/if}
{/if}
