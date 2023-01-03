<template>
    <v-container>
        <Resource verified name="FastAsyncWorldEdit "
            description="Blazingly fast world manipulation for builders, large networks and developers." :rating="0.96"
            :downloads="682223" />
        <arrow v-for="(hop, i) in hops" :key="i" :delay="1">
            <hop />
        </arrow>
        <arrow class="text-center" :delay="1">
            <v-alert variant="tonal" color="primary" class="my-3 pa-10">
                <h4>Optionally, add hops</h4>
                <p>
                    Hops may help you get additional data and programatically build download URLs using intermediate
                    page loads to get further information.
                </p>
            </v-alert>
            <v-btn @click="hops.push('')" variant="text" prepend-icon="mdi-rabbit">
                Add Hop
            </v-btn>
        </arrow>
        <arrow :delay="170">
            <suggestion-input placeholder="download URL" class="mt-3" />
        </arrow>
        <arrow class="text-center" :delay="170 * 2">
            <v-btn p-icon="mdi-check">Test</v-btn>
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
    })
}

</script>