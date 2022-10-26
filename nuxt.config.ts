// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL
        }
    },
    app: {
        head: {
            link: [
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
                { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Lexend:wght@500&family=Quicksand:wght@300;400;500;600;700&display=swap" }
            ]
        }
    },
    css: [
        "~/assets/css/main.css"
    ],
    modules: [
        "@nuxtjs/tailwindcss"
    ]
})
