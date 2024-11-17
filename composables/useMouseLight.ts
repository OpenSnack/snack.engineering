import { useElementBounding, useMouseInElement, useResizeObserver, type MaybeElementRef } from '@vueuse/core';

const LIGHT_RADIUS = 400;

function getRadialGradient(
    x: string,
    y: string
): string {
    return `radial-gradient(circle ${LIGHT_RADIUS}px at ${x} ${y}, white 0%, transparent 100%)`;
}

export function useMouseLight(
    element: MaybeElementRef,
    lightsOnGetter: MaybeRefOrGetter<boolean>,
    mobileGetter: MaybeRefOrGetter<boolean>
) {
    const lightsOn = toRef(lightsOnGetter);
    const mobile = toRef(mobileGetter);
    const { elementX, elementY } = useMouseInElement(element);
    const { y, update } = useElementBounding(element);
    const inWindow = ref(false);
    if (import.meta.client) {
        document.body.addEventListener('mousemove', () => { inWindow.value = true; });
        document.body.addEventListener('mouseleave', () => { inWindow.value = false; });
    }

    // useElementBounding won't auto-update with certain page changes (eg. when we open
    // a different drag window.) on mobile, we watch document.body and update manually
    const stopResize = ref<(() => void) | null>(null);
    watch(mobile, m => {
        if (m && !stopResize.value) {
            const { stop } = useResizeObserver(document.body, () => {
                update();
            });
            stopResize.value = stop;
        }
        if (!m && stopResize.value) {
            stopResize.value();
            stopResize.value = null;
        }
    }, { immediate: true });

    return {
        maskImage: computed(() => {
            if (lightsOn.value) {
                return 'unset';
            }
            if (mobile.value) {
                return getRadialGradient('50%', `${250 - y.value}px`);
            }
            if (inWindow.value) {
                return getRadialGradient(`${elementX.value}px`, `${elementY.value}px`);
            }
            return 'linear-gradient(transparent, transparent)';
        })
    };
}
