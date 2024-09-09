<template>
    <div id="app">
        <NuxtRouteAnnouncer />
        <MainView />
    </div>
</template>

<script setup lang="ts">
import MainView from '@/views/MainView.vue';
</script>

<style lang="postcss">
body {
    @apply bg-navy-darker;
}

#app {
    @apply bg-navy-darker tracking-tight;
    font-family: 'Roobert Mono TRIAL';

    .pseudo-border::before {
        content: "";
        @apply absolute top-0 left-0 w-full h-full border-sand-light;
    }
}
</style>
