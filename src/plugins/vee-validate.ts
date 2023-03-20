import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email, min, url } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import { UserModule } from "~/types";
import en from "@vee-validate/i18n/dist/locale/en.json";
import pt_BR from "@vee-validate/i18n/dist/locale/pt_BR.json";

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

  app.component("Form", Form);
  app.component("Field", Field);
  app.component("ErrorMessage", ErrorMessage);
};
