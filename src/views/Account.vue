<template>
  <div>
    <!-- spigot mc accounts -->
    <div class="card" style="margin-bottom: 10px">
      <header class="card-header">
        <p class="card-header-title">Linked accounts</p>
        <button class="card-header-icon">
          <b-icon icon="sync" pack="fas" />
        </button>
      </header>
      <div v-if="linked != null">
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
      </div>
      <a
        v-if="linked == null"
        class="panel-block"
        style="padding: 14px; padding-top: 18px; padding-bottom: 18px"
      >
        <b-skeleton size="is-large" :count="1" />
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
        <b-field label-position="on-border" label="Username">
          <b-input
            disabled
            type="text"
            :loading="settings.account.native == null"
            v-model="settings.account.username"
          />
        </b-field>
        <b-field label-position="on-border" label="GitHub">
          <b-input
            disabled
            type="text"
            :loading="settings.account.native == null"
            v-model="settings.account.githubId"
          />
        </b-field>
        <b-field label-position="on-border" label="UID">
          <b-input
            disabled
            type="text"
            :loading="settings.account.native == null"
            v-model="settings.account.id"
          />
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
            :indeterminate="commercial == null"
            :disabled="commercial == null"
            v-model="commercial"
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
      <div v-if="sessions != null">
        <a
          v-for="session in sessions"
          :key="session.id"
          class="panel-block"
          style="padding: 14px"
        >
          <b-dropdown :triggers="['hover']" aria-role="list">
            <template #trigger>
              <b-button style="color: black" type="is-ghost">
                <b-icon pack="fas" icon="caret-down" />
              </b-button>
            </template>
            <b-dropdown-item
              @click="closeSession(session)"
              style="color: red"
              aria-role="listitem"
            >
              <b-icon icon="sign-out-alt" pack="fas" />Close
            </b-dropdown-item>
          </b-dropdown>
          <b-tag style="margin-right: 10px">{{
            session.getCreation().toLocaleString()
          }}</b-tag>{{ sessionInfo(session) }}
        </a>
      </div>
      <a
        v-if="sessions == null"
        class="panel-block"
        style="padding: 14px; padding-top: 18px; padding-bottom: 18px"
      >
        <b-skeleton size="is-large" :count="1" />
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
import UAParser from "ua-parser-js";
export default {
  props: ["account"],
  mounted() {
    this.checkAccount(this.account);
  },
  data: () => {
    return {
      loggingIn: false,
      commercial: null,
      sessions: null,
      linked: null,
      settings: {
        account: {
          native: null,
          id: null,
          username: null,
          githubId: null,
        },
      },
    };
  },
  watch: {
    commercial(newv, old) {
      if (old != null && newv != null) {
        this.$client
          .getSession()
          .getAccount()
          .commercialSubscribe(Boolean(newv[0]))
          .then(() => {
            this.updateNotifications();
          });
      }
    },
    account(newacc, old) {
      if (old != null && newacc == null) this.checkAccount(newacc);
    },
  },
  methods: {
    sessionInfo(session) {
      let userAgent = new UAParser(session.getUserAgent());
      let device = userAgent.getDevice();
      let browser = userAgent.getBrowser();
      let os = userAgent.getOS();
      let string = "";
      if (session.getCity() != null) {
        string += `${session.getCity()}, ${session.getCountry()}. `;
      }
      if (device.type != null) {
        string += `(${device.type})`;
        if (device.vendor != null) string += ` ${device.vendor}`;
        if (device.model != null) string += ` ${device.model}`;
        string += ", ";
      }
      if (browser.name != null) {
        string += `${browser.name}`;
        if (browser.version != null) string += ` (${browser.version})`;
        string += ", ";
      }
      if (os.name != null) {
        string += `${os.name}`;
        if (os.version != null) string += ` ${os.version}`;
        string += ", ";
      }
      if (string.endsWith(", ")) string = string.substr(0, string.length - 2);
      return string;
    },
    closeSession(session) {
      this.sessions = null;
      session.close().then(() => {
        this.updateSessions();
      });
    },
    updateAccount() {
      this.$client
        .getSession()
        .getAccount()
        .update()
        .then((acc) => {
          this.settings.account.native = acc;
          this.settings.account.id = acc.getId();
          this.settings.account.githubId = acc.getGithubId();
          this.settings.account.username = acc.getUsername();
        });
    },
    updateSessions() {
      this.sessions = null;
      this.$client
        .getSession()
        .getAccount()
        .getSessions()
        .then((ses) => {
          this.sessions = ses;
        });
    },
    updateNotifications() {
      this.commercial = null;
      this.$client
        .getSession()
        .getAccount()
        .isCommercialSubscribed()
        .then((val) => {
          this.commercial = val;
        });
    },
    checkAccount(acc) {
      if (acc == null && !this.loggingIn) {
        this.$emit("checkAccount");
        this.loggingIn = true;
      } else {
        this.updateSessions();
        this.updateAccount();
        this.updateNotifications();
      }
    },
  },
};
</script>