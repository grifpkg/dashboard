/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { mdi } from 'vuetify/iconsets/mdi'
import { aliases, fa } from 'vuetify/iconsets/fa'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons:{
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    }
  },
  defaults: {
    global: {
      ripple: false,
      hideDetails: 'auto',
    },
    VAppBar: {
      flat: true,
      border: "b",
    },
    VExpansionPanel: {
      rounded: 1,
    },
    VAutocomplete: {
      variant: 'solo'
    },
    VAvatar: {
      rounded: 1,
      color: 'primary',
      variant: 'tonal',
    },
    VAlert: {
      variant: 'tonal',
      rounded: 1,
    },
    VBtnGroup: {
      variant: 'tonal',
      color: 'primary',
      rounded: 1,
    },
    VSnackbar: {
      location: 'bottom right'
    },
    VSlider: {
      rounded: 1,
      color: 'primary'
    },
    VSwitch: {
      inset: true,
      color: 'primary',
    },
    VChip: {
      variant: 'elevated'
    },
    VCheckbox: {
      color: 'primary',
    },
    VRadioGroup: {
      color: 'primary'
    },
    VProgressCircular: {
      color: 'primary',
    },
    VProgressLinear: {
      rounded: 1,
      color: 'primary'
    },
    VDialog: {
      maxWidth: 400
    },
    VPagination: {
      size: 'large',
      density: 'compact'
    },
    VTextField: {
      color: 'primary',
      variant: 'solo',
    },
    VMenu: {
      offset: 5
    },
    VTextarea: {
      variant: 'solo'
    },
    VCard: {
      rounded: 1,
      border: true,
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#ff6d00',
          secondary: '#82b1ff',
          accent: '#b6e3ff',
          error: '#ff1744',
          warning: '#ff8a65',
          success: '#00e676',
          surface:'#171717'
        },
        dark:true
      },
    },
  },
})
