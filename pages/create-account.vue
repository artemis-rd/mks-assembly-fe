<script lang="ts" setup>
const operatorInfo = reactive({
    email: "",
    firstname: "",
    lastname: "",
    phone: ""
})
</script>
<template>
    <section class="create-account-container flex items-center container px-10 md:px-20 md:py-10 min-h-screen min-w-full">
        <div class="create-account-form">
            <img src="~/assets/img/mks-logo.png" class="my-5" alt="" srcset="" />
            <h4 class="text-2xl font-bold my-8 font-display">
                Hello, please complete the following form to create your operator account
            </h4>
            <div class="form-items grid grid-flow-row-dense sm:grid-cols-2 gap-5">
                <LabelInput v-model="operatorInfo.firstname" type="text" placeholder="johndoe.official@email.com"
                    label="Operator Firstname" class="my-0"  />
                <LabelInput v-model="operatorInfo.lastname" type="text" placeholder="Your secret password"
                    label="Operator Lastname" class="my-0" />
                <LabelInput v-model="operatorInfo.email" type="email" placeholder="johndoe.official@email.com"
                    label="Email Address" />
                <LabelInput v-model="operatorInfo.phone" type="tel" placeholder="Your secret password"
                    label="Phone Number" />
            </div>
            <div class="flex items-start gap-4">
                <img src="~/assets/img/checkmark.svg" class="my-1" alt="" srcset="" />
                <p class="text-xs max-w-lg">I agree that upon account creation, the administrator will have to activate the newly created account for you to login. The account username and password will be sent to the phone number provided above</p>
            </div>
            <div class="form-footer my-5 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
                <button class="shadow-xl px-8 py-3 text-sm sm:w-auto bg-orange-500 text-white rounded-xl">
                    Proceed to Create Account
                </button>
                <div class="to-login flex gap-2">
                    <span class="text-sm font-semibold">Already have an account ?</span>
                    <NuxtLink to="sign-in" class="text-orange-500 text-sm font-semibold underline">Go back and login</NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
.create-account-container {
    background: url('~/assets/img/registration-bg.svg') no-repeat 100% 50%
}
</style>