import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import 'tippy.js/animations/scale.css';

import MentionList from './List.vue'

const base = ['resource.name', 'resource.slug', 'resource.sid', 'release.tag', 'release.sid', 'release.url']
const added = ['0.prejob', '0.job', '0.build']

export default {
    char: '$',
    allowedPrefixes: [/./],
    items: ({ query }) => {
        return [...base, ...added].map(e => `{${e}}`).filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
    },

    render: () => {
        let component
        let popup

        return {
            onStart: props => {
                component = new VueRenderer(MentionList, {
                    props,
                    editor: props.editor,
                })

                if (!props.clientRect) {
                    return
                }

                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                    animation: 'scale',
                })
            },

            onUpdate(props) {
                component.updateProps(props)

                if (!props.clientRect) {
                    return
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                })
            },

            onKeyDown(props) {
                if (props.event.key === 'Escape') {
                    popup[0].hide()

                    return true
                }

                return component.ref?.onKeyDown(props)
            },

            onExit() {
                popup[0].destroy()
                component.destroy()
            },
        }
    },
}