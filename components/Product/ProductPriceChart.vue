<script setup lang="ts">
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	CategoryScale,
	Filler,
} from 'chart.js'
import type { TChartData, TChartOptions } from 'vue-chartjs/dist/types'
import { Line } from 'vue-chartjs'
import { computed } from '@vue/reactivity'
import { Price } from '~~/models/price'

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	CategoryScale,
	Filler
)

const props = defineProps<{
	title?: string
	chartId: string
	datasetIdKey?: string
	chartData: Pick<Price, 'price' | 'store' | 'created_at'>[]
	width?: number
	height?: number
	cssClasses?: string
	styles?: Partial<CSSStyleDeclaration>
}>()

const colorMode = useColorMode()

const theme = computed(() => colorMode.value)

const themeSettings = computed(() => {
	return {
		title: theme.value === 'light' ? '#334155' : '#DEE2E6',
		axisText: theme.value === 'light' ? '#0F172A' : '#9CA3AF',
		yAxisGrid: theme.value === 'light' ? '#F3F4F6' : '#323232',
		borderColor: theme.value === 'light' ? '#a78bfa' : '#7c3aed',
	}
})

function getStoreColor(store: string) {
	switch (store) {
		case 'Сільпо':
			return theme.value === 'light' ? '254, 176, 25' : '254, 176, 25'

		case 'Novus':
			return theme.value === 'light' ? '0, 277, 150' : '0, 277, 150'

		case 'Ашан':
			return theme.value === 'light' ? '255, 69, 96' : '255, 69, 96'

		case 'ЕКО маркет':
			return theme.value === 'light' ? '0, 143, 251' : '0, 143, 251'
	}
}

const options = computed<TChartOptions<'line'>>(() => {
	return {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: {
				top: 30,
			},
		},
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					color: themeSettings.value.title,
					font: {
						size: 12,
						family: 'e-Ukraine',
						weight: '400',
					},
					usePointStyle: true,
					pointStyle: 'circle',
					boxWidth: 8,
				},
			},
			tooltip: {
				displayColors: false,
				mode: 'index',
				bodySpacing: 4,
				bodyFont: {
					size: 12,
					family: 'e-Ukraine',
					weight: '400',
				},
			},
			filler: {
				propagate: false,
			},
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: false,
		},
		scales: {
			yAxis: {
				stacked: false,
				grid: {
					display: false,
					drawBorder: false,
				},
				ticks: {
					maxTicksLimit: 7,
					color: themeSettings.value.axisText,
					font: {
						size: 12,
						family: 'e-Ukraine',
						weight: '400',
					},
				},
			},
			xAxis: {
				grid: {
					display: false,
					drawBorder: false,
				},
				ticks: {
					padding: 10,
					color: themeSettings.value.axisText,
					font: {
						size: 12,
						family: 'e-Ukraine',
						weight: '400',
					},
				},
			},
		},
	}
})

const transformedData = computed<TChartData<'line'>>(() => {
	const datasets: TChartData<'line'>['datasets'] = []
	const labels: string[] = []

	props.chartData
		.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
		.forEach(item => {
			const { created_at, store, price } = item
			const dataset = datasets.find(item => item.label === store)

			const date =
				new Date(created_at).getDate() +
				' ' +
				new Date(created_at).toLocaleString('default', { month: 'short' })

			if (!labels.includes(date)) {
				labels.push(date)
			}

			if (!dataset) {
				const color = getStoreColor(store)

				datasets.push({
					label: store,
					tension: 0.15,
					borderColor: `rgba(${color}, 1)`,
					pointBackgroundColor: `rgba(${color}, 1)`,
					fill: true,
					data: [price],
					backgroundColor: ctx => {
						const canvas = ctx.chart.ctx
						const gradient = canvas.createLinearGradient(0, 0, 0, 160)

						gradient.addColorStop(0, `rgba(${color}, 0.5)`)
						gradient.addColorStop(0.5, `rgba(${color}, 0.3)`)
						gradient.addColorStop(1, `rgba(${color}, 0.15)`)

						return gradient
					},
				})
			} else {
				dataset.data.push(price)
			}
		})

	return { datasets, labels }
})
</script>

<template>
	<Line
		:chart-options="options"
		:chart-data="transformedData"
		:chart-id="chartId"
		:dataset-id-key="datasetIdKey"
		:css-classes="cssClasses"
		:styles="styles"
		:height="height"
		:width="width"
	/>
</template>
