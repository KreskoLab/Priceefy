<template>
	<div
		class="flex flex-col space-y-12 w-full h-full min-w-[320px] bg-slate-800 outline outline-2 outline-slate-700 border-4 border-transparent rounded-md hover:border-teal-400 hover:outline-transparent transition duration-200 ease-in-out py-5 px-4"
	>
		<div class="flex space-x-6 animate-pulse">
			<div
				class="flex justify-center items-center shrink-0 w-24 h-24 bg-slate-700/90 rounded-md"
			></div>

			<div class="flex flex-col space-y-2 pt-0.5 animate-pulse">
				<div class="bg-slate-700/90 rounded h-4 w-40"></div>
				<div class="bg-slate-700/90 rounded h-4 w-24"></div>
			</div>
		</div>

		<div class="flex space-x-6 animate-pulse">
			<div class="flex min-w-max items-center space-x-4">
				<div class="h-4 w-4 bg-slate-700/90 rounded"></div>
				<div class="h-4 w-16 bg-slate-700/90 rounded"></div>
			</div>

			<div class="flex items-center space-x-4">
				<div class="w-4 h-4 bg-slate-700/90 rounded"></div>
				<div class="h-4 w-16 bg-slate-700/90 rounded"></div>
			</div>
		</div>
	</div>
</template>
