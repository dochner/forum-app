import { ErrorMessage, Field, Form, configure, defineRule } from "vee-validate";
import { email, min, required, url } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import pt_BR from "@vee-validate/i18n/dist/locale/pt_BR.json";
import type { UserModule } from "~/types";

export const install: UserModule = ({ app }) => {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);
  defineRule("url", url);

  configure({
    generateMessage: localize({
      en,
      pt_BR,
    }),
  });

  app.component("VeeForm", Form);
  app.component("VeeField", Field);
  app.component("VeeErrorMessage", ErrorMessage);
};
