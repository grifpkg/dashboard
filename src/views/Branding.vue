<template>
    <v-container class="fill-height text-center">
        <v-row align="center" justify="center" class="fill-height">
            <div>
                <h1>Media Resources</h1>
                <v-btn class="mt-5 mb-10" target="_blank" href="/branding.pdf" append-icon="mdi-download">
                    Download Image PDF
                </v-btn>
                <v-row class="mb-5">
                    <v-col cols="6" md="">
                        <v-card class="pa-5">
                            <v-img style="margin:auto" width="64" src="/logo.svg" />
                        </v-card>
                    </v-col>
                    <v-col cols="6" md="">
                        <v-card color="black" class="pa-5">
                            <v-img style="margin:auto" width="64" src="/iso_dark.svg" />
                        </v-card>
                    </v-col>
                    <v-col cols="6" md="">
                        <v-card color="white" class="pa-5">
                            <v-img style="margin:auto" width="64" src="/iso_light.svg" />
                        </v-card>
                    </v-col>
                    <v-col cols="6" md="">
                        <v-card color="primary" class="pa-5">
                            <v-img style="margin:auto" width="64" src="/iso_bg.svg" />
                        </v-card>
                    </v-col>
                </v-row>
                Designed by <a target="_blank" href="https://mobile.twitter.com/judy_houses">Judy Houses</a> <v-icon size="x-small" color="primary">mdi-heart</v-icon>
            </div>
        </v-row>
    </v-container>
</template>