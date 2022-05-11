<template>
	<div></div>
</template>

<script
	setup
	lang="ts"
>
import { useUser } from '~/stores/user'
const route = useRoute()
const router = useRouter()

const token = route.query.accessToken ? route.query.accessToken : ''

if (token.length) {
	const cookie = useCookie<string>('accessToken', {
		httpOnly: true,
		sameSite: 'strict',
		domain: 'localhost',
		maxAge: 604800,
	})
	cookie.value = token as string
}

onMounted(() => {
	useUser().getUser()
	router.push('/')
})
</script>
