<template>
	<ClientOnly>
		<apexchart
			type="area"
			:series="chartSeries.series"
			:options="chartOptions"
			:key="colorMode.value"
		/>

		<template #fallback>
			<div class="h-72" />
		</template>
	</ClientOnly>
</template>

<script
	setup
	lang="ts"
>
import type { ChartSeries } from '~/models/chart-series'

const props = defineProps<{
	chartSeries: ChartSeries
}>()

const colorMode = useColorMode()

const maxPrice = computed(() => {
	const itemsPrices: number[] = []

	props.chartSeries.series.forEach(item => {
		item.data.forEach(data => itemsPrices.push(data[1]))
	})

	return Math.max(...itemsPrices)
})

const chartOptions = reactive({
	chart: {
		id: 'price',
		fontFamily: 'e-Ukraine',
		width: '100%',
		height: 'auto',
		stacked: false,
		redrawOnWindowResize: true,
		events: {
			mounted: function (chartContext, config) {
				console.log(chartContext, config)
				chartContext.windowResizeHandler()
			},
		},
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false,
		},
	},
	theme: {
		mode: colorMode.value,
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: 'smooth',
	},
	markers: {
		size: 0,
	},
	fill: {
		type: 'gradient',
		gradient: {
			shadeIntensity: 1,
			inverseColors: false,
			opacityFrom: 0.45,
			opacityTo: 0.05,
			stops: [20, 100, 100, 100],
		},
	},
	tooltip: {
		enabled: true,
		theme: colorMode.value,
		x: {
			show: true,
			formatter: function (val) {
				return val + ' ' + new Date().toLocaleString('default', { month: 'long' })
			},
		},
		y: {
			formatter: function (value) {
				return `${value} ₴`
			},
		},
	},
	yaxis: {
		tickAmount: 1,
		max: maxPrice.value,
		labels: {
			formatter: function (val) {
				return val.toFixed(2)
			},
		},
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
	},
	xaxis: {
		min: Math.min(...props.chartSeries.timeseries),
		max: Math.max(...props.chartSeries.timeseries),
		labels: {
			trim: false,
			formatter: function (val) {
				return val + ' ' + new Date().toLocaleString('default', { month: 'short' })
			},
		},

		tooltip: {
			enabled: false,
		},
	},
})

onMounted(() => {
	nextTick(() => {
		window.dispatchEvent(new Event('resize'))
	})
})

watch(colorMode, val => {
	Object.assign(chartOptions, {
		...chartOptions,
		tooltip: { ...chartOptions.tooltip, theme: val.value },
		theme: { mode: val.value },
	})
})
</script>

<style>
.apexcharts-tooltip.apexcharts-theme-dark {
	background: #2f3d51 !important;
}

.apexcharts-tooltip.apexcharts-theme-dark .apexcharts-tooltip-title {
	background: #263346 !important;
}

.apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
	background: #f8f8fa !important;
	border: 0 !important;
}

.apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-series-group.apexcharts-active {
	color: #1f2937 !important;
	font-weight: 400 !important;
}

.apexcharts-tooltip.apexcharts-theme-dark .apexcharts-tooltip-series-group.apexcharts-active {
	color: #dde3eb !important;
	font-weight: 400 !important;
}

.apexcharts-canvas .apexcharts-svg {
	background: transparent !important;
}
</style>
