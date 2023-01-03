<template>
    <v-scroll-y-transition>
        <div v-if="show">
            <div class="text-primary text-center my-3">
                <v-icon size="large">mdi-arrow-down-thin</v-icon>
            </div>
            <slot />
        </div>
    </v-scroll-y-transition>
</template>

<script>
export default {
    props: ["delay"],
    data: () => ({
        show: false
    }),
    async mounted() {
        await new Promise(resolve => setTimeout(resolve, this.delay));
        this.show = true
    }
}
</script>