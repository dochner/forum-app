import type { MaybeRef } from "@vueuse/core";

export const useFetchData = async (url: MaybeRef<string>) => {
  const {
    data,
    error,
    isFetching: isLoading,
    abort,
    execute,
    get,
    post,
    put,
    formData,
    delete: del,
    onFetchError: onError,
    onFetchFinally: onDone,
  } = await useFetch(url);

  return {
    data,
    error,
    isLoading,
    onError,
    onDone,
    abort,
    execute,
    get,
    post,
    put,
    del,
    formData,
  };
};
