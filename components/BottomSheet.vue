<template>
	<div
		v-if="showBottomSheet"
		class="fixed w-full h-screen z-50 top-0 overflow-hidden bg-white/5 backdrop-blur-md"
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
				class="flex flex-col space-y-6 rounded-t-3xl dark:bg-slate-900 bg-gray-300 mt-32 pt-8 px-6 h-[calc(100%-8rem)]"
				:style="height > 0 ? `margin-top: ${height}px` : ''"
			>
				<div
					ref="swipe"
					class="h-[4px] w-24 mx-auto rounded-md bg-slate-200"
				></div>

				<SideBar />
			</div>
		</Transition>
	</div>
</template>

<script
	setup
	lang="ts"
>
const showBottomSheet = useBottomSheet()
const show = ref<boolean>(true)
const height = ref<number>(0)

const sheetBody = ref<HTMLElement | null>(null)
const swipe = ref<HTMLElement | null>(null)
const sheetBodyWidth = computed(() => sheetBody.value?.offsetWidth)

onMounted(() => {
	onClickOutside(sheetBody, () => (show.value = false))

	const { lengthY } = useSwipe(swipe, {
		passive: false,
		onSwipe(e: TouchEvent) {
			if (sheetBodyWidth.value) {
				if (lengthY.value < 0) {
					height.value = Math.abs(lengthY.value) + 50
				}
			}
		},
		onSwipeEnd() {
			if (
				lengthY.value < 0 &&
				sheetBodyWidth.value &&
				Math.abs(lengthY.value) / sheetBodyWidth.value >= 0.4
			) {
				show.value = false
			}
		},
	})
})

function hideBottomSheet() {
	showBottomSheet.value = false
	show.value = true
	height.value = 0
}
</script>
