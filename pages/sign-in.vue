<script setup lang="ts">
import { clear } from "console";
import { FetchError } from "ohmyfetch";

const router = useRouter();

const {
  public: { AUTH_SERVICE_URL },
} = useRuntimeConfig();

const userInfo = reactive({
  email: "",
  password: "",
});

const clearForm = () => {
  userInfo.email = "";
  userInfo.password = "";
};

const errorMessage = ref("");
const authenticating = ref(false);

async function loginAttempt() {
  authenticating.value = true;
  try {
    const { data, error } = await useFetch<any>(
      `${AUTH_SERVICE_URL}/auth/login`,
      {
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (error.value) {
      throw error.value;
    }
    // since we don't have an error, get the token returned
    const { token } = data.value;

    const cookie = useCookie("mks-token");
    cookie.value = token;
    // clear the form data
    clearForm();
    authenticating.value = false;
    router.push("dashboard/messenger");
  } catch (error) {
    authenticating.value = false;
    if (error instanceof FetchError) {
      errorMessage.value = error.response._data.errors[0].description;
      setTimeout(() => {
        errorMessage.value = "";
      }, 5000);
    }
  }
}
</script>
<template>
  <section
    class="sign-in-container flex items-center container px-10 md:px-20 md:py-10 min-h-screen min-w-full"
  >
    <div class="sign-in-form w-96">
      <Alert v-if="errorMessage !== ''">
        <div class="content text-sm font-semibold">{{ errorMessage }}</div>
      </Alert>
      <img src="~/assets/img/mks-logo.png" class="my-5" alt="" srcset="" />
      <h4 class="text-3xl font-bold my-8 font-display">
        Sign in to your operator account
      </h4>

      <LabelInput
        v-model="userInfo.email"
        type="text"
        placeholder="johndoe.official@email.com"
        label="Enter your email address or username"
      />

      <LabelInput
        v-model="userInfo.password"
        type="password"
        placeholder="Your secret password"
        label="Enter your Password"
      />
      <div class="flex gap-10 align-middle justify-between my-4">
        <div class="remember-me-container flex gap-2 align-baseline">
          <input type="checkbox" name="remember" id="remember" />
          <label for="remember" class="text-sm">Remember Me</label>
        </div>
        <div class="forgot-password-container">
          <NuxtLink to="forgot-password" class="text-sm text-red-500 underline"
            >Forgot Password</NuxtLink
          >
        </div>
      </div>
      <div class="form-submit my-4">
        <button
          v-if="!authenticating"
          @click="loginAttempt"
          class="shadow-xl px-8 py-3 text-sm min-w-full bg-orange-500 text-white rounded-xl"
        >
          Proceed to Login
        </button>
        <Loading v-else />
      </div>
      <div class="form-footer flex gap-2">
        <p class="text-sm">Wish to have an account ?</p>
        <NuxtLink to="create-account" class="text-sm text-red-500 underline"
          >Register from Here</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.sign-in-container {
  background: url("~/assets/img/bg.svg") no-repeat 110% 50%;
  background-size: 60%;
}
</style>
