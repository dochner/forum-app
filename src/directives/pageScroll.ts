const PageScroll = {
  mounted (el, binding) {
    el.__PageScroll__ = useDebounceFn(() => {
      binding.value()
    }, 200)
    document.addEventListener('scroll', el.__PageScroll__)
  },
  unmounted (el) {
    document.removeEventListener('scroll', el.__PageScroll__)
  }
}
export default (app) => {
  app.directive('page-scroll', PageScroll)
}
