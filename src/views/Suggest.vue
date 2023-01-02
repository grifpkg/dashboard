<template>
    <v-container>
        <Resource verified name="FastAsyncWorldEdit "
            description="Blazingly fast world manipulation for builders, large networks and developers." :rating="0.96"
            :downloads="682223" />
        <suggestion class="mt-3" />
        <div class="mt-3 mb-3">
            <v-row no-gutters align="center">
                <v-col>
                    <suggestion />
                </v-col>
                <v-col class="mb-0" cols="auto">
                    <v-card style="overflow:visible;z-index:1" border="t e b">
                        <v-btn icon variant="tonal" :color="null" height="54">
                            <v-icon>mdi-xml</v-icon>
                            <v-menu activator="parent">
                                <v-list :rounded="0" variant="tonal" class="pa-0">
                                    <v-list-item prepend-icon="mdi-xml" title="HTML/XML" />
                                    <v-list-item prepend-icon="mdi-code-json" title="JSON" />
                                </v-list>
                            </v-menu>
                        </v-btn>
                        <v-btn color="red" icon="mdi-close" variant="tonal" :color="null" height="54" />
                    </v-card>
                </v-col>
            </v-row>
            <v-card class="pa-4">
                <v-row v-for="i in 3" :key="i">
                    <v-col>
                        <v-text-field placeholder="name" variant="outlined" />
                    </v-col>
                    <v-col>
                        <suggestion placeholder="value" />
                    </v-col>
                    <v-col>
                        <suggestion placeholder="selector" />
                    </v-col>
                    <v-col>
                        <v-text-field variant="outlined" placeholder="fallback" />
                    </v-col>
                </v-row>
            </v-card>
        </div>
        <v-btn append-icon="mdi-web-plus">Add Hop</v-btn>
    </v-container>
</template>

<script>
// "verified", "name", "description", "rating", "downloads"
import Resource from '@/components/Resource.vue';
import Suggestion from '@/components/suggestion/Suggestion.vue';

export default {
    components: {
        Resource,
        Suggestion
    }
}

</script>