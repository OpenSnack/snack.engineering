<template>
    <div id="main-view">
        <SiteHeader
            :mobile="isMobileSized"
            :lights-on="lightsOn"
            @toggle-mouse-light="toggleMouseLight"
        />
        <div class="main-content" :class="{ mobile: isMobileSized }">
            <DragWindow
                :mobile="isMobileSized"
                :active="activeWindow === 0"
                title="about me"
                :initial-x-fraction="0.0825"
                :initial-y-fraction="0.0825"
                :initial-width="540"
                :lights-on="lightsOn"
                @open="activeWindow = 0"
                @close="activeWindow = null"
            >
                <template #content>
                    <p class="text-balance">
                        lead project developer at <span v-html="darkhorseLink" />
                    </p>
                    <br>
                    <p class="text-balance">
                        occasional designer, full-time <span class="colour-overlay">colour enjoyer</span>
                    </p>
                    <br>
                    <p class="text-balance">
                        a clear visual and an engaging story can change the world. i want to use my skills to help improve the lives of people everywhere, and i want to help other devs to do the same.
                    </p>
                    <br>
                    <p class="text-balance">
                        be kind, tell the truth, believe in something, and above all, chill and hang out :)
                    </p>
                </template>
            </DragWindow>
            <DragWindow
                :mobile="isMobileSized"
                :active="activeWindow === 1"
                :title="projectsTitle"
                :initial-x-fraction="0.4"
                :initial-y-fraction="0.125"
                :initial-width="520"
                :lights-on="lightsOn"
                @open="activeWindow = 1"
                @close="activeWindow = null"
            >
                <template #content>
                    <ExternalLink
                        name="opportunity atlas"
                        url="https://www.opportunityatlas.org/"
                    />
                    <br><div class="link-description">which places in america offer children the best chance to rise out of poverty?</div>
                    <br>
                    <ExternalLink
                        name="aidsvu interactive map"
                        url="https://map.aidsvu.org/"
                    />
                    <br><div class="link-description">how is the HIV epidemic impacting communities across the united states?</div>
                    <br>
                    <ExternalLink
                        name="climate vulnerability index"
                        url="https://map.climatevulnerabilityindex.org/"
                    />
                    <br><div class="link-description">which communities face the greatest challenges from the impacts of a changing climate?</div>
                    <br>
                    <ExternalLink
                        name="social capital atlas"
                        url="https://socialcapital.org/"
                    />
                    <br><div class="link-description">how does social capital connect to children's chances of rising out of poverty?</div>
                    <br>
                    <ExternalLink
                        name="precision for covid"
                        url="https://www.precisionforcoviddata.org/"
                    />
                    <br><div class="link-description">how can government officials, policymakers, and citizens better plan, prepare, and respond to COVID-19?</div>
                    <br>
                    <ExternalLink
                        name="alberta biodiversity reporting"
                        url="https://orb.abmi.ca/"
                    />
                    <br><div class="link-description">what's the status of land cover and biodiversity in alberta?</div>
                </template>
            </DragWindow>
            <DragWindow
                :mobile="isMobileSized"
                :active="activeWindow === 2"
                title="where to find me"
                :initial-x-fraction="0.6"
                :initial-y-fraction="0.25"
                :initial-width="300"
                :lights-on="lightsOn"
                @open="activeWindow = 2"
                @close="activeWindow = null"
            >
                <template #content>
                    <div class="links">
                        <ExternalLink
                            name="OpenSnack"
                            url="https://github.com/OpenSnack/"
                        >
                            <Icon icon="mdi:github" :width="20" :height="20" />
                        </ExternalLink>
                        <br>
                        <ExternalLink
                            name="@snack.engineering"
                            url="https://bsky.app/profile/snack.engineering"
                        >
                            <Icon icon="ri:bluesky-fill" :width="20" :height="20" />
                        </ExternalLink>
                        <br>
                        <ExternalLink
                            name="@OpenSnack"
                            url="https://twitter.com/OpenSnack/"
                        >
                            <Icon icon="mdi:twitter" :width="20" :height="20" />
                        </ExternalLink>
                        <div>
                            <Icon class="inline-flex align-middle mr-1" icon="mdi:discord" :width="20" :height="20" />
                            <span>opensnack</span>
                        </div>
                        <ExternalLink
                            name="steve@dha.io"
                            url="mailto:steve@dha.io"
                        >
                            <Icon icon="mdi:email" :width="20" :height="20" />
                        </ExternalLink>
                        <br>
                        <ExternalLink
                            name="my decks"
                            url="https://www.moxfield.com/users/opensnack"
                        >
                            <Icon icon="mdi:cards" :width="20" :height="20" />
                        </ExternalLink>
                    </div>
                </template>
            </DragWindow>
            <div class="h-12" />
            <DragWindow
                :mobile="isMobileSized"
                :active="activeWindow === 3"
                title="coming one day™"
                :initial-x-fraction="0.25"
                :initial-y-fraction="0.35"
                :initial-width="400"
                :lights-on="lightsOn"
                @open="activeWindow = 3"
                @close="activeWindow = null"
            >
                <template #content>
                    bully me until i finish these projects:
                    <br>
                    <br>
                    <span class="underline">boundary</span>
                    <br><div class="ml-4">a "computer game" and a love letter to online scavenger hunts</div>
                    <br>
                    <span class="underline">gamut</span>
                    <br><div class="ml-4">a colour scale builder with features you didn't know you wanted</div>
                </template>
            </DragWindow>
            <DragWindow
                :mobile="isMobileSized"
                :active="activeWindow === 4"
                title="living rent‑free in my head"
                :initial-x-fraction="0.125"
                :initial-y-fraction="0.75"
                :initial-width="500"
                :lights-on="lightsOn"
                header-icon="ph:arrows-clockwise-light"
                @open="activeWindow = 4"
                @close="activeWindow = null"
                @icon-click="getRandomRentFree"
            >
                <template #content>
                    <ExternalLink
                        v-if="currentRentFree !== null"
                        :name="rentFree[currentRentFree].name"
                        :url="rentFree[currentRentFree].url"
                    />
                </template>
            </DragWindow>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon, loadIcons } from '@iconify/vue';
import { useWindowSize } from '@vueuse/core';

const activeWindow = ref<number | null>(null);

onBeforeMount(() => {
    loadIcons([
        'mdi:github',
        'mdi:twitter',
        'mdi:discord',
        'mdi:email-outline',
        'mdi:cards-outline',
        'ph:arrows-clockwise-light'
    ]);
})

const { width: windowWidth } = useWindowSize();
const checkMobile = ref(false);
const isMobileSized = computed(() => {
    if (!checkMobile.value) return false;
    return windowWidth.value < 800;
});

const lightsOn = ref(false);
const toggleMouseLight = () => {
    lightsOn.value = !lightsOn.value;
};

const darkhorseLink = `<a target="_blank" href="https://darkhorseanalytics.com">darkhorse analytics</a>`;
const projectsTitle = `projects (w/ ${darkhorseLink})`;

const rentFree = [
    {
        name: '"how about two reds, a blue, and an orange?"',
        url: 'https://homestarrunner.com/toons/lookin-at-a-thing-in-a-bag'
    },
    {
        name: '"today on the underwater world, we will explore the territory of the dreaded bubblefish."',
        url: 'https://www.albinoblacksheep.com/flash/demented'
    },
    {
        name: '"what kind of music is that? like, a bossa nova beat?"',
        url: 'https://www.youtube.com/watch?v=B_qnI1WrlnU'
    },
    {
        name: '"right when he starts firing to try to backboost me, the double. body armor. two quick ones." (explicit)',
        url: 'https://www.youtube.com/watch?v=oYmqJl4MoNI'
    },
    {
        name: '"never let an LLM speak for you ... never let an LLM think for you."',
        url: 'https://roe.dev/blog/using-ai-in-open-source'
    },
    {
        name: '"types exist no matter what. you can put them in your code, or in your mind."',
        url: 'https://twitter.com/giuseppelt/status/1699500387466633307'
    },
    {
        name: '"not having been to war is something to be proud of."',
        url: 'https://www.imdb.com/title/tt23289160/'
    },
    {
        name: `"they pressed the similes by which i'd named them on until they were lies, telling a truth they'd never been able to before."`,
        url: 'https://www.goodreads.com/book/show/9265453-embassytown'
    },
    {
        name: `i can't have this becoming a dream again.`,
        url: 'https://myanimelist.net/anime/28735/Shouwa_Genroku_Rakugo_Shinjuu'
    },
    {
        name: '"targets quickly cease to be a way of measuring performance and become ends in themselves."',
        url: 'https://files.libcom.org/files/Capitalist%20Realism_%20Is%20There%20No%20Alternat%20-%20Mark%20Fisher.pdf'
    },
    {
        name: '"there is an almost unanimous agreement between the birds and the plants that you are going to destroy us all."',
        url: 'https://store.steampowered.com/app/632470/Disco_Elysium__The_Final_Cut/'
    },
    {
        name: '"just breathe slow and steady, in and out ... you can do this."',
        url: 'https://store.steampowered.com/app/504230/Celeste/'
    },
    {
        name: `"i don't know what you kids are up to, but i do know one thing. laws are threats ..." (explicit)`,
        url: 'https://youtu.be/0oXiFuPCU6k?si=ZPxBFR3x4Ibv1ROn&t=283'
    }
];
const rentFreeIndices = ref<number[]>([]);
const currentRentFree = ref<number | null>(null);
const getRandomRentFree = () => {
    if (rentFreeIndices.value.length === 0) {
        rentFreeIndices.value = rentFree.map((r, i) => i);
    }
    let nextRentFree = rentFreeIndices.value[Math.floor(Math.random() * rentFreeIndices.value.length) ?? 0];
    if (nextRentFree === currentRentFree.value) {
        nextRentFree = nextRentFree === 0 ? nextRentFree + 1 : nextRentFree - 1;
    }
    currentRentFree.value = nextRentFree;
    rentFreeIndices.value = rentFreeIndices.value.filter(i => i !== nextRentFree);
};

onMounted(() => {
    checkMobile.value = true;
    if (isMobileSized.value) {
        activeWindow.value = 0;
    }
    getRandomRentFree();
});
</script>

<style lang="postcss" scoped>
#main-view {
    @apply min-h-screen;
    background: repeating-linear-gradient(
        45deg,
        theme('colors.navy.dark'),
        theme('colors.navy.dark') 1px,
        transparent 1px,
        transparent 10px
    );
    background-position: left top;

    .main-content {
        min-height: calc(100vh - 48px);

        &.mobile {
            @apply flex flex-col gap-2 p-2;
        }
    }

    .content p {
        :deep(a) {
            @apply underline;
        }
    }

    .colour-overlay {
        background-image: linear-gradient(to right, rgb(33,113,181) 0%, rgb(106,81,163) 50%, rgb(203,24,29) 100%);
        background-clip: text;
        color: transparent;
    }

    .links {
        @apply flex flex-col gap-0.5;
    }

    .link-description {
        @apply ml-4 text-balance;
    }
}
</style>
