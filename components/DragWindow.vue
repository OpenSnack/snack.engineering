<template>
    <div
        class="drag-window pseudo-border"
        :class="{ active, loaded, mobile }"
        ref="dragWindow"
    >
        <div class="header">
            <button
                type="button"
                class="plus-bg"
                disabled
            >
                <Icon
                    :icon="active ? 'ph:minus-light' : 'ph:plus-light'"
                    :width="28"
                    :height="28"
                />
                <span class="title" v-html="title" />
            </button>
            <button
                type="button" 
                class="plus-fg"
                @click="onToggle"
            >
                <Icon
                    :icon="active ? 'ph:minus-light' : 'ph:plus-light'"
                    :width="28"
                    :height="28"
                />
                <span class="title" v-html="title" />
            </button>
            <div
                v-if="active && headerIcon"
                class="header-icon"
            >
                <button
                    type="button"
                    class="header-icon-bg"
                    disabled
                >
                    <Icon
                        :icon="headerIcon"
                        :width="32"
                        :height="32"
                    />
                </button>
                <button
                    type="button"
                    ref="headerIconRef"
                    class="header-icon-fg"
                    @click="emit('icon-click')"
                >
                    <Icon
                        :icon="headerIcon"
                        :width="32"
                        :height="32"
                    />
                </button>
            </div>
        </div>
        <div class="content">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDraggable, useWindowSize, onClickOutside } from '@vueuse/core';
import { Icon, loadIcons } from '@iconify/vue';

const props = defineProps<{
    mobile: boolean;
    active: boolean;
    title: string;
    initialXFraction: number;
    initialYFraction: number;
    initialWidth: number;
    lightsOn: boolean;
    headerIcon?: string;
}>();

const emit = defineEmits<{
    (event: 'open'): void;
    (event: 'close'): void;
    (event: 'icon-click'): void;
}>();

const loaded = ref(false);
onBeforeMount(() => {
    loadIcons(['ph:minus-light', 'ph:plus-light']);
})

const dragWindow = ref();
const headerIconRef = ref();

const { width: windowWidth, height: windowHeight } = useWindowSize();
const initialXInPixels = computed(() => windowWidth.value * props.initialXFraction);
const initialYInPixels = computed(() => windowHeight.value * props.initialYFraction);

const disableDragging = ref(true);
const { x, y } = useDraggable(dragWindow, {
    initialValue: { x: initialXInPixels.value, y: initialYInPixels.value },
    disabled: disableDragging
})
const xPx = computed(() => `${x.value}px`);
const yPx = computed(() => `${y.value}px`);
const width = ref(props.initialWidth);
const widthPx = computed(() => `${width.value}px`);

const lightsOn = computed(() => props.lightsOn);
const { maskImage } = useMouseLight(dragWindow, lightsOn, () => props.mobile);
const { maskImage: iconMaskImage } = useMouseLight(headerIconRef, lightsOn, () => props.mobile);

onMounted(() => {
    loaded.value = true;

    watch([windowWidth, () => props.mobile], ([w, m], [oldW, oldM]) => {
        if (m && !oldM) {
            x.value = 0;
            y.value = 0;
            disableDragging.value = true;
        } else if (!m && oldM) {
            x.value = windowWidth.value * props.initialXFraction;
            y.value = windowHeight.value * props.initialYFraction;
            disableDragging.value = false;
        } else if (!m) {
            x.value *= oldW ? w / oldW : 1;
        }
    }, { immediate: true });

    onClickOutside(dragWindow, (e) => {
        if (
            props.active
            && (!e.target || (e.target as HTMLElement).classList.contains('clr-i-outline'))
        ) {
            emit('close')
        }
    })
});

const onToggle = () => {
    if (props.active) {
        emit('close');
    } else {
        emit('open');
    }
}
</script>

<style lang="postcss" scoped>
.drag-window {
    @apply absolute flex flex-col opacity-0 p-1;
    left: v-bind('xPx');
    top: v-bind('yPx');
    width: v-bind('widthPx');
    height: fit-content;

    transition: opacity 1s ease;

    &.mobile {
        @apply relative w-full;

        &:not(.active) .content {
            @apply h-0;
        }

        .content {
            transition: none;
        }
    }
    
    .content {
        @apply pointer-events-none opacity-0 text-sand-light font-extralight pt-4 px-10;

        transition: opacity 0.3s ease;
    }

    &.active {
       @apply bg-navy-darker/50 z-40;
       backdrop-filter: blur(2px);

        .content {
            @apply pointer-events-auto opacity-100 z-10 pb-6;
        }
    }

    &:not(.mobile) {
        .content {
            @apply pb-6;
        }
    }

    &.loaded {
        @apply opacity-100;
    }

    .header {
        @apply relative h-fit text-balance;

        :deep(a) {
            @apply underline;
        }
    }

    .plus-bg, .plus-fg {
        @apply flex gap-2 p-1 text-left;
        @apply opacity-50 text-sand-light;
        max-width: calc(100% - 40px);
    }

    .plus-bg {
        @apply absolute pointer-events-none;
        .title {
            @apply text-xl font-extralight text-sand-light italic;
        }
    }
    .plus-fg {
        @apply relative z-30;
        .title {
            @apply text-xl font-extralight text-sand-light italic;
        }
    }

    &.active .plus-fg {
        @apply opacity-100;
    }

    &.active .plus-fg:hover, &:not(.active) .plus-fg:hover {
        @apply opacity-75;
    }
    
    .header-icon-bg, .header-icon-fg {
        @apply absolute top-0 right-0 p-1;
        @apply opacity-50 text-sand-light;
    }

    .header-icon-fg:hover  {
        @apply opacity-75;
    }

    &::before {
        @apply border;
    }

    &:not(.active)::before, .plus-bg {
        mask-image: v-bind('maskImage');
    }

    .header-icon-bg {
        mask-image: v-bind('iconMaskImage');
    }
}
</style>
