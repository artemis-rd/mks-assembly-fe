// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
                { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" }
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
