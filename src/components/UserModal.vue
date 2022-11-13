<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div
    class="user-modal"
    :class="{ isModalShow: isUserModal }"
    @click.self="closeModal"
  >
    <!-- Content -->
    <div class="content">
      <div
        class="img-area"
        :style="{ 'background-image': 'url(' + image + ')' }"
      ></div>

      <!-- form -->
      <div class="forms">
        <!-- sign-up -->
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form
            @submit.prevent="handleSubmit(signUpFun)"
            class="sign-form"
            :class="{ isVisible: isVisible }"
          >
            <div class="signup-dialog">
              <a href="#" class="logo">HH</a>

              <!-- account -->
              <ValidationProvider
                name="validEmail"
                rules="required|email"
                v-slot="{ errors }"
                tag="div"
              >
                <div class="input-wrap">
                  <div
                    class="input-field"
                    :class="{ active: inputFocus == 'signAcc' }"
                  >
                    <span class="material-symbols-outlined user-icon">
                      account_circle
                    </span>
                    <input
                      type="email"
                      name="email"
                      autocomplete="on"
                      :placeholder="$t('modal.account')"
                      v-model="signUp.email"
                      @focus="inputFocus = 'signAcc'"
                      @blur="inputFocus = ''"
                    />
                  </div>
                  <span
                    class="error"
                    :class="{ 'error-show': errors.length > 0 }"
                    >{{ errors[0] }}</span
                  >
                </div>
              </ValidationProvider>

              <!-- password -->
              <ValidationProvider
                name="validPassword"
                rules="required|max:20|min:6|alpha_num"
                v-slot="{ errors }"
                tag="div"
              >
                <div class="input-wrap">
                  <div
                    class="input-field"
                    :class="{ active: inputFocus == 'signPas' }"
                  >
                    <span class="material-symbols-outlined password-icon">
                      lock
                    </span>
                    <input
                      type="password"
                      name="password"
                      class="signPas"
                      :placeholder="$t('modal.password')"
                      v-model="signUp.password"
                      autocomplete="on"
                      @focus="inputFocus = 'signPas'"
                      @blur="inputFocus = ''"
                    />
                    <span
                      class="material-symbols-outlined eye-icon"
                      v-if="isEye"
                      @click="eyeToggle()"
                    >
                      visibility_on
                    </span>
                    <span
                      class="material-symbols-outlined eye-icon"
                      v-else
                      @click="eyeToggle()"
                    >
                      visibility_off
                    </span>
                  </div>
                  <span
                    class="error"
                    :class="{ 'error-show': errors.length > 0 }"
                    >{{ errors[0] }}</span
                  >
                </div>
              </ValidationProvider>

              <!-- note text -->
              <p class="note">
                {{ $t("modal.notice") }}<a href="#">{{ $t("modal.terms") }}</a
                >.
              </p>

              <!-- submit button -->
              <button
                type="submit"
                :disabled="invalid"
                :class="{ pass: !invalid }"
              >
                {{ $t("modal.sign_up") }}
              </button>

              <!-- switch button -->
              <p class="note text-center">
                {{ $t("modal.log_txt") }}
                <a
                  href="#"
                  @click.prevent="isVisible = !isVisible"
                  :class="{ isVisibe: isVisible }"
                  >{{ $t("modal.log_in") }}</a
                >
              </p>
            </div>
          </form>
        </ValidationObserver>

        <!-- log-in -->
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form
            @submit.prevent="handleSubmit(logInFun)"
            class="log-form"
            :class="{ isVisible: isVisible }"
          >
            <div class="login-dialog">
              <a href="#" class="logo">HH</a>

              <!-- account -->
              <ValidationProvider
                name="validEmail"
                rules="required|email"
                v-slot="{ errors }"
                tag="div"
              >
                <div class="input-wrap">
                  <div
                    class="input-field"
                    :class="{ active: inputFocus == 'logAcc' }"
                  >
                    <span class="material-symbols-outlined user-icon">
                      account_circle
                    </span>
                    <input
                      type="email"
                      name="email"
                      autocomplete="on"
                      :placeholder="$t('modal.account')"
                      v-model="logIn.email"
                      @focus="inputFocus = 'logAcc'"
                      @blur="inputFocus = ''"
                    />
                  </div>
                  <span
                    class="error"
                    :class="{ 'error-show': errors.length > 0 }"
                    >{{ errors[0] }}</span
                  >
                </div>
              </ValidationProvider>

              <!-- password -->
              <ValidationProvider
                name="validPassword"
                rules="required|max:20|min:6|alpha_num"
                v-slot="{ errors }"
                tag="div"
              >
                <div class="input-wrap">
                  <div
                    class="input-field"
                    :class="{ active: inputFocus == 'logPas' }"
                  >
                    <span class="material-symbols-outlined password-icon">
                      lock
                    </span>
                    <input
                      type="password"
                      name="password"
                      class="logPas"
                      autocomplete="on"
                      :placeholder="$t('modal.password')"
                      v-model="logIn.password"
                      @focus="inputFocus = 'logPas'"
                      @blur="inputFocus = ''"
                    />
                    <span
                      class="material-symbols-outlined eye-icon"
                      v-if="isEye"
                      @click="eyeToggle()"
                    >
                      visibility_on
                    </span>
                    <span
                      class="material-symbols-outlined eye-icon"
                      v-else
                      @click="eyeToggle()"
                    >
                      visibility_off
                    </span>
                  </div>
                  <span
                    class="error"
                    :class="{ 'error-show': errors.length > 0 }"
                    >{{ errors[0] }}</span
                  >
                </div>
              </ValidationProvider>

              <!-- checkbox -->
              <label for="remember" class="d-block"
                >{{ $t("modal.remember") }}
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  v-model="memorize"
                  :true-value="true"
                  :false-value="false"
                />
                <span class="checkmark"></span>
              </label>

              <!-- submit button -->
              <button :disabled="invalid" :class="{ pass: !invalid }">
                {{ $t("modal.log_in") }}
              </button>

              <!-- note -->
              <p class="note text-center">
                {{ $t("modal.sign_txt") }}
                <a href="#" @click.prevent="isVisible = !isVisible">{{
                  $t("modal.sign_up")
                }}</a>
              </p>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { messagePopUp } from "@/assets/js/functions.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      image:
        "https://media.istockphoto.com/photos/guest-bedroom-with-a-queen-sized-bed-and-nightstand-at-a-short-term-picture-id1336925615?b=1&k=20&m=1336925615&s=170667a&w=0&h=Kj0woErKXcYjj1L0z1yddfPvHbkc11CoN5f1dVdKx60=",
      isVisible: false,
      isEye: false,
      memorize: false,
      inputFocus: "",
      signUp: {
        email: "",
        password: "",
      },
      logIn: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters("userModules", ["isUserModal"]),
    ...mapGetters(["isLoading"]),
  },
  methods: {
    async logInFun() {
      // 1. Fetch
      this.$store.dispatch("updateLoading", true);
      const response = await this.$store.dispatch(
        "userModules/logIn",
        this.logIn
      );

      // 2. Message
      messagePopUp(response.data.message[this.$i18n.locale]);

      if (!response.data.success)
        return this.$store.dispatch("updateLoading", false);

      // 3. Storage
      const user = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        uid: response.data._id,
        expired: new Date().getTime() + 1000 * 60 * 60 * 2,
      };

      this.memorize
        ? localStorage.setItem("user", JSON.stringify(user))
        : sessionStorage.setItem("user", JSON.stringify(user));

      // 4. UI
      this.closeModal();
      this.logIn = {};
      this.$store.commit("userModules/LOGIN_STATUS", true);
      this.$store.dispatch("updateLoading", false);
    },
    async signUpFun() {
      // Fetch
      this.$store.dispatch("updateLoading", true);
      const response = await this.$store.dispatch(
        "userModules/signUp",
        this.signUp
      );

      // 2. Message
      messagePopUp(response.data.message[this.$i18n.locale]);

      // 3. UI
      this.$store.dispatch("updateLoading", false);
    },
    closeModal() {
      this.$store.commit("userModules/USER_MODAL", false);
    },
    eyeToggle() {
      this.isEye = !this.isEye;
      const logPas = document.querySelector(".logPas");
      const signPas = document.querySelector(".signPas");
      const logPasType =
        logPas.getAttribute("type") === "password" ? "text" : "password";
      const signPasType =
        logPas.getAttribute("type") === "password" ? "text" : "password";
      logPas.setAttribute("type", logPasType);
      signPas.setAttribute("type", signPasType);
    },
  },
};
</script>
