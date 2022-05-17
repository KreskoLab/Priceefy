<template>
	<div></div>
</template>

<script
	setup
	lang="ts"
>
import { User } from '~/models/user'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const token = route.query.accessToken ? route.query.accessToken : ''
const userStore = useUser()

const cookie = useCookie<string>('accessToken', {
	httpOnly: true,
	sameSite: 'strict',
	domain: config.domain,
	maxAge: 604800,
})

cookie.value = token as string

onMounted(async () => {
	const res = await $fetch('/api/user', {
		headers: useRequestHeaders(['cookie']),
		credentials: 'include',
	})

	if (res.status) {
		userStore.value.user = res.user
		userStore.value.loggedIn = true
	} else {
		userStore.value.user = {} as User
		userStore.value.loggedIn = false
	}

	router.push('/')
})
</script>
