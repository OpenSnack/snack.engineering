// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {
        enabled: true
    },
    modules: ['@nuxtjs/tailwindcss'],
    hooks: {
        // remove extra aliases that all do the same thing, because it messes with autocomplete
        'prepare:types': function ({ tsConfig }) {
            const aliasesToRemoveFromAutocomplete = ['~~', '~~/*', '@@', '@@/*', '~', '~/*'];
            for (const alias of aliasesToRemoveFromAutocomplete) {
                if (tsConfig.compilerOptions?.paths[alias]) {
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete tsConfig.compilerOptions.paths[alias];
                }
            }
        }
    },
});
