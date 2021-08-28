<template>
  <div>
    <b-loading
      :is-full-page="true"
      v-model="loadingResource"
      :can-cancel="false"
    ></b-loading>
    <transition name="fadeIn">
      <div v-if="resource != null">
        <h1 style="font-size: 20px; margin-top: 5px; margin-bottom: 10px">
          {{ resource.name
          }}<b-tag style="margin-left: 5px; transform: translatey(-2px)">
            <b-icon icon="fingerprint" pack="fas" style="margin-right: 2px" />{{
              resource.id
            }}</b-tag
          ><b-tag style="margin-left: 5px; transform: translatey(-2px)">
            <b-icon
              icon="external-link-alt"
              pack="fas"
              style="margin-right: 2px"
            />{{ resource.resourceId }}
          </b-tag>
        </h1>

        <copy-bar :expanded="true" :value="requireString" />
        <transition name="fadeIn">
          <div
            v-if="releases != null"
            class="box"
            style="margin-top: 10px; margin-bottom: 0px"
          >
            <div
              class="columns"
              v-for="(release, id) in releases"
              :key="release.id"
              :style="
                id < releases.length - 1
                  ? 'border-bottom: 1px solid rgba(0,0,0,0.05)'
                  : null
              "
            >
              <div class="column">
                {{ release.version
                }}<b-tag
                  style="margin-left: 5px"
                  type="is-primary is-light"
                  v-if="id == 0"
                  >latest</b-tag
                >
              </div>
              <div class="column" style="text-align: right">
                <router-link :to="`/suggest/${resource.id}`">
                  <b-tag
                    v-if="release.hasSuggestions"
                    type="is-primary is-light"
                    style="transform: translatey(-2px)"
                    >pending review</b-tag
                  >
                  <b-tag
                    v-if="
                      release.hasSuggestions != null && !release.hasSuggestions
                    "
                    type="is-primary is-light"
                    style="transform: translatey(-2px)"
                    >needs suggestions</b-tag
                  >
                </router-link>
                <b-tag style="margin-left: 5px; transform: translatey(-2px)">
                  <b-icon
                    icon="fingerprint"
                    pack="fas"
                    style="margin-right: 2px"
                  />{{ release.id }}</b-tag
                >
              </div>
            </div>
          </div>
        </transition>
        <div
          style="
            margin-top: 20px;
            text-align: justify;
            text-justify: inter-word;
          "
        >
          <small>
            <i>{{ resource.name }}</i> is coded and mantained by
            <i>{{ resource.author.username }}</i
            >. grifpkg doesn't own this resource and all rights are reserved to
            {{ resource.name }}'s development team. grifpkg helps with the
            distribution of this software but the final content managment is
            governed by its host service {{ serviceString }}. grifpkg condemns
            and will always condemn piracy and we rigorously control package
            distribution. If you are an active plugin developer, you can modify
            the information available for your resources and see advanced
            analytics and use distributions tools provided by grifpkg that will
            allow you to protect, improve and understand your software success
            by using your grifpkg account and linking it with the host services.
          </small>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { Resource } from "@grifpkg/client";
import CopyBar from "../components/CopyBar.vue";
export default {
  components: { CopyBar },
  props: ["resourceId"],
  data: () => {
    return {
      requireString: null,
      loadingResource: false,
      resource: null,
      releases: null,
      serviceString: null,
    };
  },
  mounted() {
    this.loadResource();
  },
  methods: {
    loadResource() {
      let main = this;
      main.loadingResource = true;
      main.serviceString = "unknown";
      Resource.fromId(this.resourceId)
        .then((resource) => {
          switch (resource.service) {
            case 0:
              main.serviceString = "spigotmc.org";
              break;
          }
          main.resource = resource;
          main.resource.getReleases().then((releases) => {
            main.releases = releases;
          });
          main.requireString = `@${resource.author.username}/${resource.name}`;
        })
        .finally(() => {
          main.loadingResource = false;
        });
    },
  },
};
</script>