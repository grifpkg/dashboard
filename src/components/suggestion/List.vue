<template>
    <v-list variant="tonal" class="items py-0">
        <template v-if="items.length">
            <v-list-item :title="item" class="item" :class="{ 'is-selected': index === selectedIndex }"
                v-for="(item, index) in items" :key="index" @click="selectItem(index)">
            </v-list-item>
        </template>
        <div class="item" v-else>
            <v-list-item title="uh?" subtitle="unknown variable"
                prepend-avatar="https://media.tenor.com/QA_IqSKoWTcAAAAM/the-rock.gif" />
        </div>
    </v-list>
</template>
  
<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },

        command: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            selectedIndex: 0,
        }
    },

    watch: {
        items() {
            this.selectedIndex = 0
        },
    },

    methods: {
        onKeyDown({ event }) {
            if (event.key === 'ArrowUp') {
                this.upHandler()
                return true
            }

            if (event.key === 'ArrowDown') {
                this.downHandler()
                return true
            }

            if (event.key === 'Enter' || event.key === 'Tab' || event.key === ' ') {
                this.enterHandler()
                return true
            }

            return false
        },

        upHandler() {
            this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
        },

        downHandler() {
            this.selectedIndex = (this.selectedIndex + 1) % this.items.length
        },

        enterHandler() {
            this.selectItem(this.selectedIndex)
        },

        selectItem(index) {
            const item = this.items[index]

            if (item) {
                this.command({ id: item })
            }
        },
    },
}
</script>
  
<style lang="scss">
.item {
    &.is-selected {
        background: rgb(var(--v-theme-primary));
    }
}
</style>