<template>
    <v-container class="fill-height text-center" style="max-width:400px">
        <v-row align="center" justify="center" class="fill-height">
            <div>
                <h1>Login to grifpkg</h1>
                <h4>Get resource analytics, developer tooling, enable donations, and much more</h4>
                <v-sheet class="mt-10 pa-3 mb-5">
                    <p class="mb-3"><small>Login with</small></p>
                    <v-btn to="/settings" class="mt-2" block v-for="method in methods" :key="method">
                        {{ method }}
                    </v-btn>
                </v-sheet>
                <p class="mb-2">
                    <small>By logging in, you accept our
                        <router-link to="/legal">privacy policy</router-link>
                        and
                        <router-link to="/legal">TOS</router-link>
                    </small>
                </p>
                <v-btn to="/" size="small" variant="plain">
                    Go to homepage
                </v-btn>
            </div>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        methods: ['Microsoft', 'Google', 'GitHub', 'Discord']
    })
}
</script>