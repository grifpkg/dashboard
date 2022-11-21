<template>
    <v-navigation-drawer :rail-width="64" :model-value="$vuetify.display.mobile ? drawer : true"
        :rail="!$vuetify.display.mobile" :permanent="!$vuetify.display.mobile" :temporary="$vuetify.display.mobile">
        <v-list nav color="primary">
            <v-list-item class="pl-3" :prepend-icon="link.meta.icon" :title="link.name"
                :to="$router.currentRoute.value.matched?.[0].path + link.path"
                v-for="link in this.$router.currentRoute.value.matched?.[0].children ?? []" :key="link.path" link />
        </v-list>
    </v-navigation-drawer>
    <v-container>
        <h1>{{ this.$router.currentRoute.value.name }}</h1>
        <v-divider class="my-2" />
        <router-view />
    </v-container>
</template>

<script>
export default {
    props: ["drawer"],
}
</script>