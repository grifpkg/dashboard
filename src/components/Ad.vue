<script>
// https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-vue/components/CarbonAds.vue
export default {
  name: "Ad",
  watch: {
    $route(to, from) {
      if (
        to.path !== from.path &&
        // Only reload if the ad has been loaded
        // otherwise it's possible that the script is appended but
        // the ads are not loaded yet. This would result in duplicated ads.
        this.$el.querySelector("#carbonads")
      ) {
        this.$el.innerHTML = "";
        this.load();
      }
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      const s = document.createElement("script");
      s.id = "_carbonads_js";
      s.src = `//cdn.carbonads.com/carbon.js?serve=CEBDT27Y&placement=vuejsorg`;
      this.$el.appendChild(s);
    },
  },
  render(h) {
    return h("div", { class: "carbon-ads" });
  },
};
</script>

<style lang="css">
#carbonads {
  min-height: 110px;
  min-width: 180px;
  margin-bottom: -0.5rem;
  font-size: 0.75rem;
  max-width: 170px;
  padding: 5px;
  padding-top: 17px;
  border: 1px solid #999;
  border-radius: 4px;
  text-align: center;
}
.carbon-ads a {
  color: #444;
  font-weight: normal;
  display: block !important;
}
.carbon-text {
  margin-top: 5px;
  padding-left: 7px;
  padding-right: 7px;
  text-align: justify;
}

.carbon-ads.carbon-img img {
  display: block !important;
}

.carbon-poweredby {
  color: #999;
  display: block !important;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  text-transform: uppercase;
}
</style>