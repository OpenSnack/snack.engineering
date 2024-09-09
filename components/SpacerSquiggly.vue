<template>
    <div class="spacer">
        <div class="tilde">
            <div class="tilde-bg">
                <Icon icon="ph:tilde-thin" :width="48" :height="48" />
            </div>
            <div class="tilde-fg">
                <Icon icon="ph:tilde-thin" :width="48" :height="48" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<style lang="postcss" scoped>
.spacer {
    @apply relative flex justify-center items-center h-12;

    .tilde {
        @apply relative flex justify-center items-center text-sand-light;

        .tilde-bg, .tilde-fg {
            @apply absolute opacity-50 text-sand-light;
        }
    }
}
</style>
