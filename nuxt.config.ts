// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Pocket Track',
            link: [
                {rel: 'icon', href: '/favicon.svg'},
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=DM%20Sans:100,200,300,400,500,600,700,800'
                },
            ],
            bodyAttrs: {
                class: 'bg-white dark:bg-gray-900'
            }
        },

    },
    colorMode: {
        preference: 'light'
    },
    modules: [
        "@nuxt/ui",
        "@vueuse/nuxt",
        "dayjs-nuxt",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "@formkit/auto-animate",
        "@nuxtjs/kinde",
    ],
    dayjs: {
        plugins: ['relativeTime'],
    },
    css: [
        '@/assets/main.css',
    ],

    devtools: {enabled: true}
})
