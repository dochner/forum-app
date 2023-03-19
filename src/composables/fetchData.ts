import { MaybeRef } from "@vueuse/core"

export const useFetchData = (url: MaybeRef<string>) => {
  const {
    data,
    error,
    isFetching: isLoading,
    abort,
    execute,
    onFetchError: onError,
    onFetchFinally: onDone
  } = useFetch(url)

  return {
    data,
    error,
    isLoading,
    onError,
    onDone,
    abort,
    execute,
  }
}
