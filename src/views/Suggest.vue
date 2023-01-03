<template>
    <v-container>
        <Resource verified name="FastAsyncWorldEdit "
            description="Blazingly fast world manipulation for builders, large networks and developers." :rating="0.96"
            :downloads="682223" />
        <arrow v-for="(hop, i) in hops" :key="i" :delay="1">
            <hop @delete="handleHopDelete" />
        </arrow>
        <arrow class="text-center" :delay="1">
            <v-alert v-if="this.hops.length==0||this.hops.length>=3" variant="tonal" color="primary" class="my-3 px-10 py-6">
                <template v-if="hops.length>=3">
                    <h3>You can't add more than 3 hops</h3>
                </template>
                <template v-else>
                    <h3 class="mb-3">Optionally, add hops</h3>
                    <p>
                        Hops may help you get additional data and programatically build download URLs using intermediate
                        page loads to get further information. Most download URLs <u>don't</u> need hops, 
                        unless they are hosted under some sort of CMS such as GitHub Releases
                    </p>
                </template>
            </v-alert>
            <v-btn :disabled="hops.length>=3" @click="hops.push('')" variant="text" append-icon="mdi-rabbit">
                Add Hop
            </v-btn>
        </arrow>
        <arrow :delay="170">
            <v-card style="overflow:visible">
                <div class="pa-4 pb-0">
                    <v-row no-gutters class="mb-6" v-for="i in 2" :key="i" align="center">
                        <v-col>
                            <suggestion-input placeholder="download URL" />
                        </v-col>
                        <v-col v-if="i>1" cols="auto" class="pl-6">
                            <v-btn color="red" icon="mdi-close" variant="tonal" height="56" />
                        </v-col>
                    </v-row>
                </div>
                <v-btn append-icon="mdi-file-plus" block size="large" variant="tonal">
                    Add Output
                </v-btn>
            </v-card>
        </arrow>
        <arrow class="text-center" :delay="170 * 2">
            <v-btn append-icon="mdi-check">Test</v-btn>
        </arrow>
    </v-container>
</template>

<script>
// "verified", "name", "description", "rating", "downloads"
import Arrow from '@/components/animation/Arrow.vue';
import Resource from '@/components/Resource.vue';
import Hop from '@/components/suggestion/Hop.vue';
import SuggestionInput from '@/components/suggestion/input/Input.vue';

export default {
    components: {
        Resource,
        SuggestionInput,
        Hop,
        Arrow
    },
    data: () => ({
        hops: []
    }),
    methods: {
        handleHopDelete(){
            // TODO differential removal
            this.hops.pop()
        }
    }
}

</script>