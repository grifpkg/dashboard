<template>
  <b-field>
    <b-input
      :style="expanded ? 'width:100%' : null"
      disabled
      :value="`grif install ${value}`"
    ></b-input>
    <p class="control">
      <CopyToClipboard :text="`grif install ${value}`">
        <b-button
          @click="showMessage()"
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
  props: ["value", "dark", "expanded"],
  components: {
    CopyToClipboard,
  },
  methods: {
    showMessage() {
      this.$buefy.toast.open("copied " + this.value);
    },
  },
};
</script>