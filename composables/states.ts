export const useSelectedStore = () => useState("store", () => ({}))
export const useSelectedCategory = () => useState("category", () => ({}))

export const useCity = () => {
    const cookie = useCookie<object>("cityCookie", {maxAge: 2147483647})
    cookie.value = cookie.value || { name: "Київ", slug: "kyiv" }

    return useState("city" , () => cookie.value);
}