import { User } from '~/models/user'

export const useUser = () => {
	const user = useState('user', () => ({
		loggedIn: false,
		user: {} as User,
	}))

	return user
}

export const logIn = async () => {
	const userStore = useUser()

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
}

export const logOut = async () => {
	const user = useUser()

	await $fetch('/api/logout', {
		headers: useRequestHeaders(['cookie']),
		credentials: 'include',
	}).then(() => {
		user.value.loggedIn = false
		user.value.user = {} as User
	})
}
