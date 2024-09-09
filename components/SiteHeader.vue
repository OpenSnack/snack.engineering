<template>
    <div
        class="site-header pseudo-border"
        :class="{ lightsOn }"
        ref="siteHeader"
    >
        <div class="my-name">
            <span class="my-name-bg">steve boddez</span>
            <span class="my-name-fg">steve boddez</span>
        </div>
        <button
            type="button"
            class="lightbulb-bg"
            disabled
            ref="lightbulb"
        >
            <Icon
                icon="clarity:lightbulb-line"
                :width="36"
                :height="36"
            />
        </button>
        <button
            type="button"
            class="lightbulb-fg"
            @click="emit('toggle-mouse-light')"
        >
            <Icon
                icon="clarity:lightbulb-line"
                :width="36"
                :height="36"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
import { Icon, loadIcons } from '@iconify/vue';

const props = defineProps<{
    mobile: boolean;
    lightsOn: boolean;
}>();

const emit = defineEmits<{
    (event: 'toggle-mouse-light'): void;
}>();

onBeforeMount(() => {
    loadIcons(['clarity:lightbulb-line']);
})

const siteHeader = ref();
const lightbulb = ref();

const lightsOn = computed(() => props.lightsOn);
const { maskImage } = useMouseLight(siteHeader, lightsOn, () => props.mobile);
const { maskImage: maskImageButton } = useMouseLight(lightbulb, lightsOn, () => props.mobile);
</script>

<style lang="postcss" scoped>
.site-header {
    @apply relative flex justify-between items-center w-full h-12 pl-4 pr-2 z-50;
    backdrop-filter: blur(2px);

    .my-name {
        @apply text-sand-light text-xl;

        .my-name-bg {
            @apply absolute opacity-50;
        }
        .my-name-fg {
            @apply opacity-50;
        }
    }

    .lightbulb-bg, .lightbulb-fg {
        @apply absolute top-1 right-1 opacity-50 text-sand-light;
    }

    &::before {
        @apply border-b bg-sand-light/30;
    }

    &.lightsOn::before {
        @apply bg-sand-light/15;
    }

    &.lightsOn .lightbulb-fg {
        @apply opacity-100;
    }

    &:not(.lightsOn) .lightbulb-fg:hover, &.lightsOn .lightbulb-fg:hover {
        @apply opacity-75;
    }

    &::before, .my-name-bg {
        mask-image: v-bind('maskImage');
    }

    .lightbulb-bg {
        mask-image: v-bind('maskImageButton');
    }
}
</style>
