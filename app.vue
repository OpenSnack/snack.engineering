<template>
    <div id="app">
        <Head>
            <Title>steve boddez - developer</Title>
            <Meta
                hid="og:title"
                property="og:title"
                content="steve boddez - developer"
            />
            <Meta
                hid="twitter:title"
                name="twitter:title"
                content="steve boddez - developer"
            />
            <Meta
                hid="og:type"
                property="og:type"
                content="website"
            />
            <Meta
                hid="og:site_name"
                property="og:site_name"
                content="steve boddez"
            />
            <Meta
                hid="og:url"
                property="og:url"
                content="https://snack.engineering"
            />
        </Head>
        <NuxtRouteAnnouncer />
        <MainView />
    </div>
</template>

<script setup lang="ts">
import MainView from '@/views/MainView.vue';

useHead({
    htmlAttrs: { lang: 'en' },
    link: [
        { rel: 'icon', href: '/favicon.png' },
        { crossorigin: 'anonymous', rel: 'stylesheet', href: 'https://static.snack.engineering/dmvendor.css' },
    ]
});
</script>

<style lang="postcss">
body {
    @apply bg-navy-darker;
}

#app {
    @apply bg-navy-darker;
    font-family: 'dm', monospace;

    .pseudo-border::before {
        content: "";
        @apply absolute top-0 left-0 w-full h-full border-sand-light;
    }
}
</style>
