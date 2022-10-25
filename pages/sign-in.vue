<script lang="ts">

</script>
<template>
    <section class="sign-in-container container p-20 min-h-screen min-w-full">
        <div class="sign-in-form w-96">
            <img src="~/assets/img/mks-logo.png" alt="" srcset="">
            <h4 class="text-3xl font-bold">Sign in to your operator account</h4>
            <LabelInput type="text" placeholder="johndoe.official@email.com" label="Enter your email address or username" />
            <LabelInput type="password" placeholder="Your secret password" label="Enter your Password" />
            <div class="flex gap-10 align-middle justify-between">
                <div class="remember-me-container flex gap-2 align-baseline">
                    <input type="checkbox" name="remember" id="remember">
                    <label for="remember" class="text-sm">Remember Me</label>
                </div>
                <div class="forgot-password-container">
                    <NuxtLink to="forgot-password" class="text-sm text-red-500 underline">Forgot Password</NuxtLink>
                </div>
            </div>
            <div class="form-submit my-4">
                <button class="shadow-xl px-8 py-3 text-sm min-w-full bg-orange-600 text-white rounded-xl">Proceed to Login</button>
            </div>
            <div class="form-footer flex gap-2">
                <p class="text-sm">Wish to have an account ?</p>
                <NuxtLink to="create-account" class="text-sm text-red-500 underline">Register from Here</NuxtLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
.sign-in-container {
    background-image: url('~/assets/img/bg.svg');
    background-repeat: no-repeat;
    background-position: 100% 80%;
    background-size: 60%;
}
</style>