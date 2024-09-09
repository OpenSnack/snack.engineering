export default {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './composables/**/*.{js,ts}',
        './plugins/**/*.{js,ts}',
        './views/**/*.{vue,js,ts}',
        './stores/**/*.{vue,js,ts}',
        './App.{js,ts,vue}',
        './app.{js,ts,vue}',
        './Error.{js,ts,vue}',
        './error.{js,ts,vue}'
    ],
    theme: {
        extend: {
            colors: {
                sand: {
                    light: '#EFDFC7',
                    'light-transparent': 'rgba(232,222,206,0)',
                    dark: '#AE8C69'
                },
                navy: {
                    dark: '#071D21',
                    darker: '#0F151F',
                    darkest: '#111317'
                }
            },
        }
    }
}
