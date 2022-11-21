<template>
    <v-alert color="primary" class="mb-2">
        You don't have any linked profiles. Link them and instantly verify your resources, get analytics, enable
        donations, and enable payouts!
    </v-alert>
    <v-card class="pa-3 mb-2">
        <v-list-item title="www.spigotmc.org">
            <template v-slot:append>
                <v-btn>
                    Login using the CLI
                </v-btn>
            </template>
        </v-list-item>
    </v-card>
    <v-card class="pa-3 mb-2">
        <v-list-item title="www.curseforge.com">
            <template v-slot:append>
                <v-btn>
                    Login now
                </v-btn>
            </template>
        </v-list-item>
    </v-card>
    <v-card class="pa-3 mb-2">
        <v-list-item title="www.modrinth.com">
            <template v-slot:append>
                <v-btn>
                    Login now
                </v-btn>
            </template>
        </v-list-item>
    </v-card>
</template>