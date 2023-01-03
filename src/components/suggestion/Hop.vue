<template>
    <v-row no-gutters align="center">
        <v-col>
            <suggestion-input placeholder="hop input URL" />
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
                <v-btn :loading="removing" @click="remove()" color="red" icon="mdi-close" variant="tonal" height="54" />
            </v-card>
        </v-col>
    </v-row>
    <v-card class="pa-4">
        <v-row v-for="i in 3" :key="i">
            <v-col>
                <v-text-field placeholder="name" variant="outlined" />
            </v-col>
            <v-col>
                <suggestion-input placeholder="value" />
            </v-col>
            <v-col>
                <suggestion-input placeholder="selector" />
            </v-col>
            <v-col>
                <v-text-field variant="outlined" placeholder="fallback" />
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import SuggestionInput from './input/Input.vue';

export default {
    emits:["delete"],
    components: {
        SuggestionInput
    },
    data: () => ({
        removing:false
    }),
    methods:{
        async remove(){
            this.removing=true
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                // TODO delete
                this.$emit('delete')                
            } catch (error) {
                // TODO show error
            }
            this.removing=false
        }
    }
}
</script>