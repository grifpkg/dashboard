<template>
  <b-field>
    <b-input disabled :value="`grif install ${value}`"></b-input>
    <p class="control">
      <CopyToClipboard :text="`grif install ${value}`">
        <b-button
          :class="`button ${dark != null && dark ? 'is-dark' : 'is-light'}`"
        >
          <b-icon pack="fas" icon="copy"></b-icon
        ></b-button>
      </CopyToClipboard>
    </p>
  </b-field>
</template>
<script>
import CopyToClipboard from "vue-copy-to-clipboard";
export default {
  props: ["value", "dark"],
  components: {
    CopyToClipboard,
  },
};
</script>