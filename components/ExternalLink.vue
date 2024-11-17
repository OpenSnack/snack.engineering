<template>
    <component
        :is="active ? 'a' : 'span'"
        class="external-link"
        target="_blank"
        :href="url"
    >
        <div class="left-icon">
            <slot />
        </div>
        <span class="link-text">{{ name }}</span>
        <Icon class="inline-flex align-middle" icon="lets-icons:external" />
    </component>
</template>

<script setup lang="ts">
import { Icon, loadIcons } from '@iconify/vue';

defineProps<{
    name: string;
    url: string;
    active: boolean;
}>();

onBeforeMount(() => {
    loadIcons(['lets-icons:external']);
})
</script>

<style lang="postcss" scoped>
.external-link {
    .left-icon {
        @apply inline-flex align-middle;
        > * {
            @apply mr-1;
        }
    }

    .link-text {
        @apply underline align-middle mr-1;
    }
}
</style>
