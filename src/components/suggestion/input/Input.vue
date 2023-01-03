<template>
    <div style="position:relative">
        <editor-content :editor="editor" />
        <v-tooltip theme="light" text="view available variables by typing $">
            <template v-slot:activator="{ props }">
                <v-icon v-bind="props" style="position:absolute;right:10px;top:0px;bottom:0px;margin:auto;opacity:0.5">
                    mdi-function
                </v-icon>
            </template>
        </v-tooltip>
    </div>
</template>
  
<script>
import Mention from '@tiptap/extension-mention'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

import engine from './engine'

export default {
    props: ["placeholder"],
    components: {
        EditorContent,
    },

    data() {
        return {
            editor: null,
        }
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Mention.configure({
                    HTMLAttributes: {
                        class: 'mention',
                    },
                    suggestion: engine,
                }),
                Placeholder.configure({
                    placeholder: this.placeholder,
                }),
            ],
            content: '',
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>


<style lang="scss">
.ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    height: 0;
}

.ProseMirror {
    >*+* {
        margin-top: 0.75em;
    }

    outline:none;
    border: solid 1px rgba(var(--v-border-color), 0.3);
    transition: 150ms;

    &:hover {
        border: solid 1px rgba(var(--v-border-color), var(--v-medium-emphasis-opacity));
    }

    &:focus {
        border: solid 2px rgba(var(--v-theme-primary), 1);
        padding: 14px
    }

    padding:15px
}

.mention {
    background: rgb(var(--v-theme-primary));
    color: white;
    padding: 2px 1px 2px 1px;
    box-decoration-break: clone;
}
</style>