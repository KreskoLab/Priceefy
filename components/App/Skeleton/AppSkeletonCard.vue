<template>
	<article
		class="flex flex-col space-y-12 w-full h-full min-w-[320px] dark:bg-slate-800 bg-white outline outline-2 dark:outline-slate-700 outline-gray-200 border-4 border-transparent rounded-md py-5 px-4"
	>
		<div class="flex space-x-6 animate-pulse">
			<div
				class="flex justify-center items-center shrink-0 w-24 h-24 dark:bg-slate-700/90 bg-gray-200 rounded-md"
			></div>

			<div class="flex flex-col space-y-2 pt-0.5 animate-pulse">
				<div class="dark:bg-slate-700/90 bg-gray-200 rounded h-4 w-40"></div>
				<div class="dark:bg-slate-700/90 bg-gray-200 rounded h-4 w-24"></div>
			</div>
		</div>

		<div class="flex space-x-6 animate-pulse">
			<div class="flex min-w-max items-center space-x-4">
				<div class="h-4 w-4 dark:bg-slate-700/90 bg-gray-200 rounded"></div>
				<div class="h-4 w-16 dark:bg-slate-700/90 bg-gray-200 rounded"></div>
			</div>

			<div class="flex items-center space-x-4">
				<div class="w-4 h-4 dark:bg-slate-700/90 bg-gray-200 rounded"></div>
				<div class="h-4 w-16 dark:bg-slate-700/90 bg-gray-200 rounded"></div>
			</div>
		</div>
	</article>
</template>
