<script>
	import Icon from '@iconify/svelte';

	let datas = [
		{
			id: 1,
			title: '109220-Naturalization',
			user: 'Chameron Phillips',
			message: 'Please check this out!',
			date: 'January 1, 2021 19:10'
		},
		{
			id: 2,
			title: 'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]',
			user: 'Ellen',
			message: 'Hey, please read',
			date: '02/06/2021 10:45'
		},
		{
			id: 3,
			title: '8405-Diana SALAZAR MUNGUIA',
			user: 'Cameron Phillips',
			message: 'I understand your initial concerns and thats very valid, Elizabeth. But you ...',
			date: '01/06/2021 12:19'
		},
		{
			id: 4,
			title: 'FastVisa Support',
			user: '',
			message: 'Hey there! Welcome to your inbox.',
			date: '01/06/2021 12:19'
		}
	];
</script>

<div
	class="border-[1px] border-primary-light-grey rounded-[5px] w-full h-[40px] py-[10px] px-[12px] flex items-center justify-center gap-4"
>
	<span>Search</span>
	<input type="text" class="w-[350px] h-full outline-none" />
	<Icon icon="ph:magnifying-glass-bold" />
</div>
{#each datas as data, i}
	<div class="flex gap-4 items-start">
		<img src="/icons/user-group.svg" alt="" />
		<div class="flex flex-col">
			<div class="flex gap-4">
				<span class=" text-primary-blue">{data.title}</span>
				<span class=" text-black">{data.date}</span>
			</div>
			<span class="text-black font-bold">{data.user ? `${data.user} :` : ''}</span>
			<span class="text-black">{data.message}</span>
		</div>
	</div>

	{#if i !== datas.length - 1}
		<hr class="border-[1px] border-primary-light-grey w-full" />
	{/if}
{/each}
