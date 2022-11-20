<template>
    <v-alert class="text-right" color="primary" variant="flat">
        <v-container>
            Manage your resources, approve or suggest download URLs for externally hosted files, get detailed analytics,
            enable donations, get hosting deals, and much more!
        </v-container>
    </v-alert>
    <v-sheet border="b">
        <v-container style="position:relative">
            <div style="position:absolute;top:0px;right:50px">
                <div>
                    <div class="arrow-down" />
                </div>
            </div>
            <div class="mt-5">
                <v-row align="center">
                    <v-col>
                        <v-btn target="_blank" href="https://nominal.es/discord" variant="text">Join our Discord</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <!-- <v-avatar variant="tonal">?</v-avatar> -->
                        <v-btn append-icon="mdi-login-variant">Login</v-btn>
                    </v-col>
                </v-row>
            </div>
            <div style="padding:120px 0px 120px 0px">
                <v-row no-gutters align="center" justify="center" class="fill-height">
                    <v-row>
                        <v-col cols="12" class="text-center">
                            <h1>grifpkg</h1>
                            <h3 class="mt-2">the package manager for game servers</h3>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field autofocus append-inner-icon="mdi-magnify"
                                placeholder="Search across spigotmc.org, curseforge.com and modrinth.com"
                                variant="outlined" />
                        </v-col>
                        <template v-if="!$vuetify.display.mobile">
                            <v-col cols="12" md="4" v-for="stat in stats" :key="stat.name" class="text-center">
                                <v-card class="pa-5">
                                    <h1>{{ stat.count.toLocaleString() }}</h1>
                                    <h3>{{ stat.name }}</h3>
                                </v-card>
                            </v-col>
                        </template>
                        <v-col class="text-center pt-5" cols="12">
                            <v-btn to="/install" size="large" variant="outlined" append-icon="mdi-download">
                                install grifpkg CLI
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-row>
            </div>
        </v-container>
    </v-sheet>
    <v-container>
        <v-card v-for="feature in features" :key="feature.icon" class="pa-10 my-8">
            <v-row>
                <v-col class="pr-5" cols="auto">
                    <h1>
                        <v-icon>
                            {{ feature.icon }}
                        </v-icon>
                    </h1>
                </v-col>
                <v-col>
                    <h3 class="mb-3">{{ feature.title }}</h3>
                    <h4>
                        {{ feature.description }}
                    </h4>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>


<script>
export default {
    data: () => ({
        stats: [
            {
                name: 'Resources',
                count: 74000,
            },
            {
                name: 'Releases',
                count: 390000,
            },
            {
                name: 'Authors',
                count: 65000,
            },
        ],
        features: [
            {
                icon: "mdi-pail",
                title: "Download any mod or plugin from anywhere",
                description: "grifpkg allows you to easily install any addon (even premium ones) to your game server directly from your trusted sources"
            },
            {
                icon: "mdi-cached",
                title: "Update all your plugins and mods with a single command",
                description: "instantly update every plugin and mod on your server. Forget about downloading every single resource manually"
            },
            {
                icon: "mdi-test-tube",
                title: "Debug and deploy new features on your game server",
                description: "Easily test performance with dev dependencies and minimal runs, and seamlessly deploy to affiliated hosting services"
            },
        ]
    })
}
</script>

<style>
.arrow-down {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid rgb(var(--v-theme-primary));
}
</style>