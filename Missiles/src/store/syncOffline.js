import offline from 'react-native-simple-store'

export default function(store) {
  let currentItems


  // commenting this out
  // but i do  think i can learn something from how this works
  // store.subscribe(() => {
  //   const { offlineLoaded, offlineList } = store.getState().items
  //
  //   if (offlineLoaded && currentItems != offlineList) {
  //     offline.save('items', offlineList)
  //     currentItems = offlineList
  //   }
  // })
}
