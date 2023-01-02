<template>
    <v-expand-transition>
        <div v-if="value">
            <v-alert class="text-right" color="primary" variant="flat">
                <v-container>
                    Manage your resources, approve or suggest download URLs for externally
                    hosted files, get detailed analytics, enable donations, get hosting deals,
                    and much more!
                </v-container>
            </v-alert>
            <v-slide-y-transition>
                <v-container v-if="arrow" class="pa-0" style="position:relative;overflow:visible">
                    <div style="position: absolute; top: 0px; right: 50px">
                        <div>
                            <div class="arrow-down" />
                        </div>
                    </div>
                </v-container>
            </v-slide-y-transition>
        </div>
    </v-expand-transition>
</template>

<style>
@keyframes updown {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-3px);
    }

    100% {
        transform: translateY(0px);
    }
}

.arrow-down {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid rgb(var(--v-theme-primary));
    animation: infinite 5s cubic-bezier(1, 0, 0.5, 0.5) updown;
}
</style>

<script>
export default {
    props: ["value"],
    data: () => ({
        arrow: false
    }),
    watch: {
        value(v) {
            if (v) {
                if (!this.arrow) {
                    setTimeout(() => {
                        this.arrow = true
                    }, 150);
                }
            } else {
                this.arrow = false
            }
        }
    },
    mounted() {
        if (this.value) this.arrow = true
    }
}
</script>