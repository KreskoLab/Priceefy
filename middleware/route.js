export default function ({store, route, redirect}) {
  const isStore = store.state.store ? true : false
  var stores = require('../static/stores.json')
  var categories = require('../static/categories.json')

  if (route.name == "store-id-category-page" || route.name == "store-id-category") {
    var newStore = stores.find(item => item.code == route.params.id)
    var newCategory = categories.find(item => item[route.params.id] == route.params.category) 
    store.commit('updateStore', newStore)
    store.commit('updateCategory', newCategory)
    if (route.name == "store-id-category") {
      return redirect(`/store/${newStore.code}/${newCategory[newStore.code]}/1`)
    }
  }
  if (route.name !== "store-id-category-page") {
    if (!isStore) {
      store.commit('updateStore', stores[3])
      store.commit('updateCategory', categories[1])
      return redirect(`/store/${stores[3].code}/${categories[1][stores[3].code]}/1`)  
    }
    else {
      return redirect(`/store/${store.state.store.code}/${store.state.category[store.state.store.code]}/1`)
    }
  } 
}