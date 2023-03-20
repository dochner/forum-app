<template>
  <main>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <Suspense>
            <!-- main content -->
            <component :is="Component"></component>

            <!-- loading state -->
            <template #fallback>
              <div
                class="fixed top-0 left-0 w-full h-full bg-black/4 items-center justify-center flex flex-col"
              >
                <AppSpinner />
                {{ $t("loading") }}
              </div>
            </template>
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </main>
</template>
