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

    <div
      class="columns"
      style="height: 100%; padding-top: 10px; padding-bottom: 10px"
    >
      <div
        class="column is-one-fifth"
        :is-hidden-mobile="true"
        v-if="$route.path != '/login'"
      >
        <h1 style="font-size: 24px; padding-left: 14px">
          grif.

          <b-tooltip
            v-if="account != null"
            type="is-dark"
            label="log out"
            position="is-bottom"
          >
            <b-button
              @click="logout"
              type="is-ghost"
              style="color: black !important"
              ><b-icon pack="fas" icon="sign-out-alt"></b-icon
            ></b-button>
          </b-tooltip>
        </h1>
        <div>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink v-if="account != null" to="/account">Account</NavLink>
          <NavLink v-if="account == null" :to="null" @onClick="checkAccount"
            >Login</NavLink
          >
        </div>
      </div>
      <div class="column" style="min-height: 100%">
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
        class="column is-one-fifth"
        :is-hidden-mobile="true"
        v-if="$route.path != '/login'"
      >
        <Ad style="float:right" />
      </div>
    </div>
  </div>
</template>
<script>
import NavLink from "@/components/NavLink";
import Ad from "@/components/Ad";
export default {
  components: {
    NavLink,
    Ad,
  },
  mounted() {
    /* checkAccount().then((acc)=>{
      this.loading = false;
      this.account = acc;
      if(this.account==null){
        this.$router.push({path:'/login'})
      } else {
        this.forceRender++;
      }
    })*/
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
    },
    logout() {
      this.account = null;
    },
  },
  data: () => {
    return {
      account: null,
      isLoading: false,
      forceRender: 0,
      targetPath: null,
    };
  },
};
</script>
<style>
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