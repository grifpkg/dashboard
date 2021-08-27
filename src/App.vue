<template>
  <div
    id="app"
    style="height: 100%"
    :class="$route.path != '/login' ? 'container' : ''"
  >
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <b-navbar class="is-hidden-tablet" v-if="$route.path != '/login'">
      <template #brand>
        <b-navbar-item>
          <h1 style="font-size: 20px; color: black">grifpkg</h1>
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" to="/explore"> Explore </b-navbar-item>
        <b-navbar-item tag="router-link" to="/install"> Install </b-navbar-item>
        <b-navbar-item tag="router-link" v-if="account != null" to="/account">
          Account
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          v-if="account == null"
          @click="checkAccount"
          to=""
        >
          Login
        </b-navbar-item>
        <b-navbar-item tag="router-link" to="/resources">
          Resources
        </b-navbar-item>
      </template>
    </b-navbar>
    <div
      class="columns"
      style="height: 100%; padding-top: 10px; padding-bottom: 10px; margin: 0px"
    >
      <div
        class="column is-one-fifth is-hidden-mobile"
        v-if="$route.path != '/login'"
      >
        <h1 style="font-size: 24px; padding-left: 14px">
          grifpkg

          <b-tooltip
            v-if="account != null"
            type="is-dark"
            label="log out"
            position="is-bottom"
          >
            <b-button
              @click="logout"
              type="is-ghost"
              style="
                color: black !important;
                padding: 0px;
                margin-left: 10px;
                margin-right: 20px;
              "
              ><b-icon pack="fas" icon="sign-out-alt"></b-icon
            ></b-button>
          </b-tooltip>
          <b-tooltip
            v-if="notifications != null && notifications.length > 0"
            size="is-large"
            always
            :active="notifications != null && notifications.length > 0"
            position="is-bottom"
            type="is-white"
            multilined
          >
            <status-indicator pulse status="negative" />
            <template v-slot:content>
              <div style="max-height: 500px; overflow-y: auto">
                <b-notification
                  v-for="notification in notifications"
                  :key="notification.id"
                  :closable="false"
                  style="text-align: left; margin-bottom: 0px"
                  type="is-white"
                >
                  <b>{{ notification.getSubject() }}</b
                  ><br />
                  <p style="margin-bottom: 10px">
                    <b-tag style="margin-right: 10px">{{
                      notification.getCreation().toLocaleString()
                    }}</b-tag>
                    {{ notification.getText() }}
                  </p>
                  <b-button
                    v-if="notification.getAction() != null"
                    tag="a"
                    :href="notification.getAction()"
                    size="is-small"
                    expanded
                    >Learn More</b-button
                  >
                </b-notification>
              </div>
              <b-button
                type="is-text"
                style="margin-top: 10px"
                @click="notifications = []"
                size="is-small"
                expanded
                >Close</b-button
              >
            </template>
          </b-tooltip>
        </h1>
        <div>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/install">Install</NavLink>
          <NavLink v-if="account != null" to="/account">Account</NavLink>
          <NavLink v-if="account == null" :to="null" @onClick="checkAccount"
            >Login</NavLink
          >
          <NavLink to="/resources">Resources</NavLink>
        </div>
      </div>
      <div
        :class="`column ${
          $route.path != '/login' ? 'is-three-fifths' : 'is-full'
        } is-full-mobile`"
        style="min-height: 100%"
      >
        <transition mode="out-in" name="scale">
          <router-view
            :account="account"
            v-if="!isLoading"
            @login="login"
            @checkAccount="checkAccount"
            :key="forceRender"
          />
        </transition>
        <div v-if="$route.path != '/login'" style="height: 10px"></div>
      </div>
      <div
        class="column is-one-fifth is-hidden-mobile-only"
        style="padding: 0px; padding-top: 12px"
        v-if="$route.path != '/login'"
      >
        <div class="is-hidden-touch">
          <Adsense
            data-ad-client="ca-pub-7638007623692967"
            data-ad-slot="1828877093"
            data-ad-format="auto"
            data-full-width-responsive="true"
          >
          </Adsense>
        </div>
        <div class="is-hidden-desktop is-hidden-mobile-only">
          <Adsense
            data-ad-client="ca-pub-7638007623692967"
            style="display: inline-block; width: 160px; height: 600px"
            data-ad-slot="7573186033"
          >
          </Adsense>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { StatusIndicator } from "vue-status-indicator";
import NavLink from "@/components/NavLink";
export default {
  components: {
    NavLink,
    StatusIndicator,
  },
  mounted() {
    if (this.$client.isAuthenticated()) {
      this.account = this.$client.getSession().getAccount();
      this.getNotifications();
    }
  },
  watch: {
    isLoading(loading) {
      if (!loading && this.targetPath != null) {
        this.$buefy.toast.open(
          "You will be redirected to " + this.targetPath + " after you log in"
        );
      }
    },
  },
  methods: {
    checkAccount() {
      if (this.account == null) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.account = null;
          if (this.account == null && this.$route.path != "/login") {
            this.targetPath = this.$route.path;
            this.$router.push({ path: "/login" });
          } else {
            this.forceRender++;
          }
        }, 1000);
      }
    },
    login(acc) {
      this.account = acc;
      if (this.targetPath != null && this.$route.path != this.targetPath) {
        this.$router.push({ path: this.targetPath });
      } else {
        this.$router.push({ path: "/" });
      }
      this.targetPath = null;
      this.getNotifications();
    },
    getNotifications() {
      this.$client
        .getSession()
        .getAccount()
        .getNotifications()
        .then((notifications) => {
          this.notifications = notifications;
        });
    },
    logout() {
      this.account = null;
    },
  },
  data: () => {
    return {
      notifications: null,
      account: null,
      isLoading: false,
      forceRender: 0,
      targetPath: null,
    };
  },
};
</script>
<style>
.animated {
  -webkit-animation-duration: 0.2s !important;
  animation-duration: 0.2s !important;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.1s ease;
  transform: scale(1);
}

.scale-enter,
.scale-leave-active {
  opacity: 0;
  transform: scale(0.975);
}
</style>