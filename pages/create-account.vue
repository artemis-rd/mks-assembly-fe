<script lang="ts" setup>
import { react } from "@babel/types";
import { FetchError } from "ohmyfetch";
import { e } from "ohmyfetch/dist/error-4c47223d";
const regErrorMessage = ref();

const router = useRouter();

const registered = reactive({
  email: '',
  password: ''
})
const pending = ref(false)
const email = ref('')
const tel = ref();
const firstName = ref();
const staffId = ref();
const lastName = ref();
function formatInput() {
  tel.value = "";
  firstName.value = "";
  staffId.value = "";
  lastName.value = "";
}
const {
  public: { AUTH_SERVICE_URL },
} = useRuntimeConfig();
async function createAccount() {
  pending.value = true;
  let operatorInfo = {
    tel: tel.value,
    email: email.value,
    name: firstName.value + " " + lastName.value,
  };
  const cookie = useCookie("mks-token");
  let token = cookie.value;
  // console.log(token, "matoken");
  try {
    let { data, error } = await useFetch<any>(`${AUTH_SERVICE_URL}/auth/signup`, {
      method: "POST",
      body: operatorInfo,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (data) {
      pending.value = false;
      formatInput();
      const { email, password } =data.value
      registered.email = email;
      registered.password = password
      // setTimeout(() => {
      //   router.push("/sign-in");
      // }, 10000);
    }
  } catch (error) {
    pending.value = false;
    if (error instanceof FetchError) {
      regErrorMessage.value = error.response._data.errors[0].description;
      setTimeout(() => {
        regErrorMessage.value = "";
      }, 5000);
    }
  }
}
</script>
<template>
  <section
    class="create-account-container flex items-center container px-10 md:px-20 md:py-10 min-h-screen min-w-full"
  >
    <div class="create-account-form">
      <img src="~/assets/img/mks-logo.png" class="my-5" alt="" srcset="" />
      <h4 class="text-2xl font-bold my-8 font-display">
        Hello, please complete the following form to create your operator
        account
      </h4>
      <div class="form-items grid grid-flow-row-dense sm:grid-cols-2 gap-5">
        <LabelInput
          v-model="firstName"
          type="text"
          placeholder="operator first name"
          label="Operator Firstname"
          class="my-0"
        />
        <LabelInput
          v-model="lastName"
          type="text"
          placeholder="operator last name"
          label="Operator Lastname"
          class="my-0"
        />
        <LabelInput
          v-model="email"
          type="email"
          placeholder="johndoe.official@email.com"
          label="Email Address"
        />
        <LabelInput
          v-model="tel"
          type="tel"
          placeholder="Example +245 700321245"
          label="Phone Number"
        />
      </div>
      <div class="my-2 text-xs max-w-lg bg-orange-50 p-3 rounded-md border border-orange-500" v-if="registered.password">
        <h2 class="font-semibold my-1">Successfully created an account for {{registered.email}}</h2>
        <p>Use the password generated below to access the account.<span class="font-bold cursor-pointer mx-2">{{registered.password}}</span></p>
      </div>
      <div class="flex items-start gap-4">
        <img src="~/assets/img/checkmark.svg" class="my-1" alt="" srcset="" />
        <p class="text-xs max-w-lg">
          I agree that upon account creation, the administrator will have to
          activate the newly created account for you to login. The account
          username and password will be sent to the phone number provided above
        </p>
      </div>
      <div
        class="form-footer my-5 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10"
      >
        <button
          @click="createAccount()"
          class="shadow-xl px-8 py-3 text-sm sm:w-auto bg-orange-500 text-white rounded-xl"
        v-if="!pending">
          Proceed to Create Account
        </button>
        <Loading v-else />
        <div class="to-login flex gap-2">
          <span class="text-sm font-semibold">Already have an account ?</span>
          <NuxtLink
            to="sign-in"
            class="text-orange-500 text-sm font-semibold underline"
            >Go back and login</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.create-account-container {
  background: url("~/assets/img/registration-bg.svg") no-repeat 100% 50%;
}
</style>
