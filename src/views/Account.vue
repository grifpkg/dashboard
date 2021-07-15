<template>
  <div>
    <!-- spigot mc accounts -->
    <div class="card" style="margin-bottom: 10px">
      <header class="card-header">
        <p class="card-header-title">SpigotMC.org accounts</p>
        <button class="card-header-icon">
          <b-icon icon="sync" pack="fas" />
        </button>
      </header>
      <a class="panel-block" style="padding: 14px">
        <b-dropdown :triggers="['hover']" aria-role="list">
          <template #trigger>
            <b-button style="color: black" type="is-ghost">
              <b-icon pack="fas" icon="wrench" />
            </b-button>
          </template>

          <b-dropdown-item aria-role="listitem">
            <b-icon icon="sync" pack="fas" />Sync / update details
          </b-dropdown-item>
          <b-dropdown-item style="color: red" aria-role="listitem">
            <b-icon icon="trash" pack="fas" />Remove
          </b-dropdown-item>
        </b-dropdown>
        quiquelhappy
      </a>
      <a class="panel-block" style="padding: 14px; padding-left: 24px">
        <span class="panel-icon">
          <i class="fas fa-plus" aria-hidden="true"></i>
        </span>
        Sync new account
      </a>
    </div>
    <!-- grif account details -->
    <div class="card" style="margin-bottom: 10px">
      <header class="card-header">
        <p class="card-header-title">Account details</p>
        <button class="card-header-icon">
          <b-icon icon="users-cog" pack="fas" />
        </button>
      </header>
      <div class="card-content">
        <b-field label-position="on-border" label="Email address">
          <b-input disabled type="text" value="" />
        </b-field>
        <b-field label-position="on-border" label="Username">
          <b-input disabled type="text" value="" />
        </b-field>
        <b-field label-position="on-border" label="Avatar">
          <b-input disabled type="text" value="" />
        </b-field>
        <b-field label-position="on-border" label="UID">
          <b-input disabled type="text" value="" />
        </b-field>
        <b-message type="is-black">
          This information will be updated after you log in again.
        </b-message>
      </div>
    </div>
    <!-- notifications details -->
    <div class="card" style="margin-bottom: 10px">
      <header class="card-header">
        <p class="card-header-title">Notification settings</p>
        <button class="card-header-icon">
          <b-icon icon="bell" pack="fas" />
        </button>
      </header>
      <div class="card-content">
        <b-field>
          <b-checkbox
            >Receive enhanced emails including updates about recommended
            resources, recommended services and social interaction</b-checkbox
          >
        </b-field>
        <b-field>
          <b-checkbox disabled value="true"
            >Receive basic emails about my account status; such as deletion
            notices, security updates, support replies and other non-commercial
            updates related directly to grif</b-checkbox
          >
        </b-field>
      </div>
    </div>
    <!-- session details -->
    <div class="card" style="margin-bottom: 10px">
      <header class="card-header">
        <p class="card-header-title">Open sessions</p>
        <button class="card-header-icon">
          <b-icon icon="key" pack="fas" />
        </button>
      </header>
      <a class="panel-block" style="padding: 14px">
        <b-dropdown :triggers="['hover']" aria-role="list">
          <template #trigger>
            <b-button style="color: black" type="is-ghost">
              <b-icon pack="fas" icon="caret-down" />
            </b-button>
          </template>
          <b-dropdown-item style="color: red" aria-role="listitem">
            <b-icon icon="sign-out-alt" pack="fas" />Close
          </b-dropdown-item>
        </b-dropdown>
        quiquelhappy
      </a>
    </div>
    <!-- privacy details -->
    <div class="card" style="margin-bottom: 10px">
      <header class="card-header">
        <p class="card-header-title">Privacy settings</p>
        <button class="card-header-icon">
          <b-icon icon="user-secret" pack="fas" />
        </button>
      </header>
      <div class="card-content">
        <b-field>
          <b-checkbox> Display ads </b-checkbox>
        </b-field>
        <b-button
          type="is-text"
          style="transform: translateX(-10px)"
          icon-pack="fas"
          icon-left="file-archive"
          ><span style="margin-left: 4px"></span>Download your data</b-button
        >
      </div>
    </div>
    <!-- danger zone -->
    <div class="card" style="margin-bottom: 10px">
      <header class="card-header">
        <p class="card-header-title">Danger zone</p>
        <button class="card-header-icon">
          <b-icon icon="exclamation-triangle" pack="fas" />
        </button>
      </header>
      <div class="card-content">
        <b-button
          type="is-text"
          style="transform: translateX(-10px); color: red"
          icon-pack="fas"
          icon-left="trash"
          ><span style="margin-left: 4px"></span>Delete your account</b-button
        >
        <b-message type="is-black" style="margin-top: 10px">
          This will remove any data ever generated by this account that can be
          personally linked to you.
        </b-message>
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