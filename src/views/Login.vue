<template>
  <div v-if="account == null" class="ext-box" style="height: 100%">
    <div class="int-box">
      <center style="max-width: 234px; margin-left: auto; margin-right: auto">
        <p style="font-size: 30px">grif</p>
        <div style="text-align: justify; margin-bottom: 8px">
          an intuitive package manager built for gaming communities.
        </div>
        <div>
          <b-tooltip
            style="margin-right: 7px"
            label="dashboard"
            type="is-dark is-square"
          >
            <b-tag type="is-light is-info">579ffe[...]</b-tag>
          </b-tooltip>
          <b-tooltip
            style="margin-right: 7px"
            label="cli"
            type="is-dark is-square"
          >
            <b-tag type="is-light is-info">93f468[...]</b-tag>
          </b-tooltip>
          <b-tooltip label="backend" type="is-dark is-square">
            <b-tag type="is-light is-info">a17c39[...]</b-tag>
          </b-tooltip>
        </div>
        <b-button
          @click="login"
          style="
            padding-left: 40px;
            padding-right: 40px;
            margin-top: 8px;
            width: 100%;
          "
          type="is-light"
          icon-left="github"
          >Login with GitHub</b-button
        >
        <b-button
          @click="$router.push({ path: '/explore' })"
          style="
            padding-left: 40px;
            padding-right: 40px;
            margin-top: 8px;
            width: 100%;
          "
          type="is-black"
          >Explore</b-button
        >
      </center>
    </div>
  </div>
</template>
<script>
export default {
  props: ["account"],
  mounted() {
    if (this.$client.isAuthenticated()) {
      this.$emit("login", this.$client.getSession().getAccount());
    }
  },
  methods: {
    login() {
      this.$grifpkg.login().then(() => {
        this.$emit("login", this.$client.getSession().getAccount());
      });
    },
  },
};
</script>