const K = 'pt_'

export const store = {
  get: (k, fb) => {
    try {
      const r = localStorage.getItem(K + k)
      return r ? JSON.parse(r) : fb
    } catch (e) {
      console.log(e)
      return fb
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(K + k, JSON.stringify(v))
    } catch (e) {
      console.log(e)
    }
  },
  rm: (k) => {
    try {
      localStorage.removeItem(K + k)
    } catch (e) {
      console.log(e)
    }
  },
  draft: {
    save: (d) => store.set('draft', d),
    get: () => store.get('draft', {}),
    clear: () => store.rm('draft'),
  },
}