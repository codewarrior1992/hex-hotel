import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend, configure } from 'vee-validate';
import { required, email, min, max , alpha_num } from "vee-validate/dist/rules";
import { i18n } from "./i18n/i18n.js";

configure({
    defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`);
        return i18n.t(`validation.${values._rule_}`, values);
    },
});

// Install required rule and message.
extend("required", required);
extend("email", email);
extend("min", min);
extend("max", max);
extend("alpha_num", alpha_num);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
