import { UserModule } from "~/types";
import { createHead } from "@vueuse/head"

export const install: UserModule = ({ app }) => {
  const head = createHead()
  app.use(head);
};
