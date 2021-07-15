<template>
  <div>
    <b-message type="is-black" style="margin-bottom: 20px">
      Resources are automatically fetched from SpigotMC.org. You can link your
      SpigotMC account to force-sync your resources, upload changelogs, check
      analytics, propagate updates with <u>pulse</u> and modify resource data
      available from grif.
    </b-message>
    <div>
      <div class="box" style="margin-bottom: 20px; padding-top:0px; padding-bottom:0px">
        <div class="content">
          <div class="columns is-vcentered">
            <div class="column">
              <b-button icon-pack="fas" icon-left="plus" style="color: black" type="is-ghost">
                Add resources
              </b-button>
            </div>
            <div class="column is-narrow">
              <b-button icon-pack="fas" icon-right="sync" style="color: black" type="is-ghost">
                Sync Resources
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="box" style="margin-bottom: 10px">
        <div class="content">
          <div class="columns is-vcentered">
            <div class="column">
              <b>@quiquelhappy/purecore</b><br />
              <span>spigot:resourceid</span>
            </div>
            <div class="column is-narrow">
              <b-tag type="is-light">Last Updated 12/7/2021</b-tag>
            </div>
            <div class="column is-narrow">
              <b-button style="color: black" type="is-ghost">
                <b-icon pack="fas" icon="external-link-alt" />
              </b-button>
            </div>
            <div class="column is-narrow">
              <b-button style="color: black" type="is-ghost">
                <b-icon pack="fas" icon="wave-square" />
              </b-button>
            </div>
            <div class="column is-narrow">
              <b-button style="color: black" type="is-ghost">
                <b-icon pack="fas" icon="sliders-h" />
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["account"],
  mounted() {
    this.checkAccount(this.account);
  },
  data: () => {
    return {
      loggingIn: false,
    };
  },
  watch: {
    account(newacc, old) {
      if (old != null && newacc == null) this.checkAccount(newacc);
    },
  },
  methods: {
    checkAccount(acc) {
      if (acc == null && !this.loggingIn) {
        this.$emit("checkAccount");
        this.loggingIn = true;
      }
    },
  },
};
</script>