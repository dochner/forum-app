import { notify } from "@kyvg/vue3-notification";

const useAuthSession = ref();
const useAuthUser = ref();
const useAuthLoading = ref(false);

export const useAuth = () => {
  onMounted(() => {
    useSupabase.auth.getSession().then(({ data }) => {
      useAuthSession.value = data.session;
    });

    useSupabase.auth.onAuthStateChange((_, _session) => {
      useAuthSession.value = _session;
    });
  });

  async function getUser() {
    try {
      useAuthLoading.value = true;
      const { user } = useAuthSession.value;

      const { data, error, status } = await useSupabase
        .from("users")
        .select(`*`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        useAuthUser.value = data;
      }
    } catch (error: any) {
      notify({
        type: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      useAuthLoading.value = false;
    }
  }

  async function updateUser() {
    try {
      useAuthLoading.value = true;

      const updates = useAuthUser.value;

      const { error } = await useSupabase.from("users").upsert(updates);

      if (error) {
        throw error;
      }
      notify({
        type: "success",
        title: "Success",
        text: "Successfully updated profile!",
      });
    } catch (error) {
      if (error instanceof Error) {
        notify({
          type: "error",
          title: "Error",
          text: error.message,
        });
      }
    } finally {
      useAuthLoading.value = false;
    }
  }

  async function signOut() {
    try {
      useAuthLoading.value = true;
      const { error } = await useSupabase.auth.signOut();
      if (error) {
        throw error;
      }
      notify({
        type: "success",
        title: "Success",
        text: "Successfully signed out!",
      });
    } catch (error) {
      if (error instanceof Error) {
        notify({
          type: "error",
          title: "Error",
          text: error.message,
        });
      }
    } finally {
      useAuthLoading.value = false;
    }
  }

  return {
    session: useAuthSession,
    user: useAuthUser,
    loading: useAuthLoading,
    getUser,
    updateUser,
    signOut,
  };
};
