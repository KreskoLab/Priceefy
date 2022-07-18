<script setup lang="ts">
const showBottomSheet = useBottomSheet()
const show = ref<boolean>(true)

const sheetBody = ref<HTMLElement | null>(null)

onMounted(() => {
	onClickOutside(sheetBody, () => (show.value = false))
})

function hideBottomSheet() {
	showBottomSheet.value = false
	show.value = true
}
</script>

<template>
	<div
		v-if="showBottomSheet"
		class="fixed w-full h-full z-50 top-0 overflow-hidden bg-white/5 backdrop-blur-md"
	>
		<Transition
			enter-active-class="animate__animated animate__faster animate__slideInUp"
			leave-active-class="animate__animated animate__faster animate__slideOutDown"
			:duration="{ enter: 500, leave: 200 }"
			mode="out-in"
			appear
			@after-leave="hideBottomSheet()"
		>
			<div
				v-if="show"
				ref="sheetBody"
				class="flex flex-col space-y-6 rounded-t-3xl dark:bg-slate-900 bg-gray-300 mt-32 py-8 px-6 h-[calc(100%-8rem)]"
			>
				<div class="h-[4px] w-24 mx-auto rounded-md bg-slate-200" />

				<TheSidebar />
			</div>
		</Transition>
	</div>
</template>
