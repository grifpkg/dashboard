<template>
  <div
    :style="
      $route.path != '/login'
        ? 'min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between;'
        : 'height:100%'
    "
  >
    <div
      id="app"
      style="height: 100%; width: 100%"
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
          <b-navbar-item tag="router-link" to="/explore">
            Explore
          </b-navbar-item>
          <b-navbar-item tag="router-link" to="/install">
            Install
          </b-navbar-item>
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
        :style="`${
          $route.path != '/login' ? '' : 'height: 100%;'
        } padding-top: 10px; padding-bottom: 10px; margin: 0px`"
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
          class="column is-one-fifth is-hidden-mobile"
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
          <div class="is-hidden-desktop is-hidden-mobile">
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
    <footer
      style="padding-bottom: 32px; padding-top: 32px"
      v-if="this.$route.path != '/login'"
      class="footer"
    >
      <div
        style="
          margin-left: auto;
          margin-right: auto;
          max-width: 1090px;
          text-align: justify;
          text-justify: inter-word;
        "
      >
        <div
          class="content has-text-centered"
          style="max-width: 500px; margin-left: auto; margin-right: auto"
        >
          <p>
            <strong>grifpkg</strong> by
            <a href="https://github.com/quiquelhappy/">quiquelhappy</a>. Chat
            with others on <a href="https://discord.gg/WETFS8N92t">Discord</a>,
            follow development on
            <a href="https://github.com/grifpkg">GitHub</a>
            or buy me a coffee on
            <a href="https://www.buymeacoffee.com/happy">buymeacoffee</a>.
          </p>
        </div>
        <small>
          grifpkg is not affiliated in anyway with any of the source services
          (spigotmc.org, mc-market.org, bukkit.org). All product and company
          names are trademarks(™) or registered (®) trademarks of their
          respective holders. Use of them does not imply any affiliation with or
          endorsement by them. All specifications are subject to change without
          notice. grifpkg doesn't own any of the resources listed on the website
          unless specified, and all rights are reserved to the individuals in
          charge of developing any given resource. grifpkg helps with the
          software distribution but the final content managment is governed by
          the host services in which the resources are listed. grifpkg condemns
          and will always condemn piracy and we rigorously control package
          distribution. If you are an active plugin developer, you can modify
          the information available for your resources and see advanced
          analytics and use distributions tools provided by grifpkg that will
          allow you to protect, improve and understand your software success by
          using your grifpkg account and linking it with the host services.
        </small>
      </div>
    </footer>
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
<style lang="css">
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
html {
  min-height: 100%; /* make sure it is at least as tall as the viewport */
  position: relative;
}
body {
  height: 100%; /* force the BODY element to match the height of the HTML element */
}
</style>