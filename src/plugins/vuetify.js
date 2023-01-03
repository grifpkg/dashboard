/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    global: {
      elevation: 0,
      ripple: false,
      hideDetails: true,
    },
    VExpansionPanel: {
      rounded: 0,
    },
    VBtn: {
      color: 'primary',
      rounded: 0,
    },
    VAvatar: {
      rounded: 1,
      color: 'primary',
      variant: 'tonal',
    },
    VAlert: {
      variant: 'tonal',
      rounded: 0,
    },
    VBtnGroup: {
      variant: 'tonal',
      color: 'primary',
      rounded: 0,
    },
    VSlider: {
      rounded: 0,
      color: 'primary'
    },
    VSwitch: {
      color: 'primary',
    },
    VCheckbox: {
      color: 'primary',
    },
    VRadioGroup: {
      color: 'primary'
    },
    VProgressLinear: {
      rounded: 0,
      color: 'primary'
    },
    VTextField: {
      singleLine: true,
      color: 'primary',
    },
    VCard: {
      rounded: 0,
      border: true,
    },
    VTooltip:{
      theme:'light'
    },
    VAppBar: {
      border: "b",
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
          success: '#00e676'
        },
        dark: true,
      },
    },
  },
})
