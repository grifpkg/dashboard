<template>
    <v-dialog max-width="500px" v-model="login">
        <v-card>
            <div class="py-3">
                <v-list-item class="py-6">
                    <template v-slot:prepend>
                        <v-avatar>
                            1
                        </v-avatar>
                    </template>
                    Install grifpkg <v-chip label color="primary">CLI</v-chip>
                    <template v-slot:append>
                        <v-btn variant="text" append-icon="mdi-download" to="/install" target="_blank">
                            Download
                        </v-btn>
                    </template>
                </v-list-item>
                <v-list-item class="py-6">
                    <template v-slot:prepend>
                        <v-avatar>
                            2
                        </v-avatar>
                    </template>
                    <p class="mb-3">Open your system terminal (<u>not</u> your game server terminal)</p>
                    <cmd :loading="!selected" :cmd="`grif link ${selected}`" />
                </v-list-item>
            </div>
            <v-divider />
            <v-card-actions>
                <v-btn color="primary" block @click="login = false">
                    Done
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-card v-for="bucket in buckets" :key="bucket[0]" class="pa-3 mb-2">
        <v-list-item :title="bucket[0]">
            <template v-slot:append>
                <v-btn :loading="selected" v-if="bucket[1]" @click="selected = bucket[0]"
                    append-icon="mdi-login-variant">
                    Login now
                </v-btn>
                <coming-soon v-else />
            </template>
        </v-list-item>
    </v-card>
    <v-slide-y-transition>
        <v-alert v-if="accounts && accounts.length <= 0" color="primary" class="mb-2">
            You don't have any linked profiles. Link them and instantly verify your resources, get analytics, enable
            donations, enable payouts, and sync premium resource acquisitions!
        </v-alert>
        <v-alert v-else-if="accounts" color="primary" class="mb-2">
            Account data is periodically fetched from external services. If you changed your username, it may take
            multiple
            days to see the changes reflected in grifpkg. You can add as many accounts as you want
        </v-alert>
    </v-slide-y-transition>
    <!--<v-divider class="my-2" />
    <v-card class="pa-3 mb-2">
        <v-list-item title="username@spigotmc.org" subtitle="user_id">
            <template v-slot:append>
                <v-btn @click="selected='spigotmc.org'" variant="text" icon="mdi-sync" :loading="selected" />
            </template>
        </v-list-item>
    </v-card>-->
</template>

<script>
import ComingSoon from '@/components/ComingSoon.vue';
import cmd from '@/components/CMD.vue';
export default {
    components: {
        ComingSoon,
        cmd
    },
    data: () => ({
        login: false,
        selected: null,
        accounts: null,
        buckets: [
            ['spigotmc.org', true],
            ['curseforge.com', false],
            ['modrinth.com', false],
        ]
    }),
    mounted() {
        setTimeout(() => {
            this.accounts = []
        }, 100);
    },
    watch: {
        login(v) {
            if (!v) this.selected = null
        },
        selected(v) {
            if (v) this.login = true
        }
    }
}
</script>