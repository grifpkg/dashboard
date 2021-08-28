<template>
  <div>
    <transition name="fadeIn">
      <div v-if="resources.length >= 5" class="card" style="overflow: hidden">
        <b-carousel :pause-info="false" :indicator="false">
          <b-carousel-item v-for="i in 5" :key="i">
            <section :class="`hero is-primary`">
              <div
                class="hero-body"
                style="padding-left: 70px; padding-right: 70px"
              >
                <h1 class="title ellipsis">{{ resources[i-1].name }}</h1>
                <p style="margin-bottom: 8px" class="subtitle ellipsis">
                  {{ resources[i-1].description }}
                </p>

                <CopyBar :value="resources[i-1].name" :dark="false" />
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
      </div>
    </transition>
    <div
      v-infinite-scroll="loadResources"
      infinite-scroll-disabled="loadingResources"
      infinite-scroll-distance="150"
    >
      <Resource
        v-for="resource in resources"
        :key="resource.id"
        :resource="resource"
      />
    </div>
    <div v-if="loadingResources">
      <div
        v-for="i in 10"
        :key="i"
        class="box"
        style="
          margin: 0px;
          margin-top: 10px;
          padding-top: 28px;
          padding-bottom: 28px;
        "
      >
        <b-skeleton animated></b-skeleton>
      </div>
    </div>
    <transition name="fadeIn">
      <div v-if="page >= 9" style="padding-top: 32px; padding-bottom: 32px">
        <center>
          <p>
            If you want to explore more resources, look for them using the CLI!
          </p>
          <b-button
            icon-left="file-download"
            icon-pack="fas"
            style="margin-top: 12px"
            tag="router-link"
            to="/install"
            type="is-black"
          >
            Install CLI
          </b-button>
        </center>
      </div>
    </transition>
  </div>
</template>
<script>
import CopyBar from "@/components/CopyBar";
import { Resource } from "@grifpkg/client";
import ResourceElement from "@/components/Resource";
export default {
  components: {
    CopyBar,
    Resource: ResourceElement,
  },
  mounted() {
    this.loadResources();
  },
  methods: {
    loadResources($state) {
      if (!this.loadingResources && this.page < 9) {
        let main = this;
        this.loadingResources = true;
        this.page++;
        Resource.getPopular(this.page)
          .then((resources) => {
            resources.forEach((resource) => {
              main.resources.push(resource);
            });
          })
          .finally(() => {
            main.loadingResources = false;
            $state.loaded();
          })
          .catch(() => {
            // ignore
          });
      } else if (!this.loadingResources && this.page >= 9) {
        $state.complete();
      }
    },
  },
  data: () => {
    return {
      resources: [],
      page: 0,
      loadingResources: false,
      featured: [
        {
          name: "purecore",
          description:
            "an all-in-one management solution for Minecraft servers",
          color: "is-info",
          dark: false,
        },
        {
          name: "EssentialsX",
          description: "most downloaded resource this week",
          color: "is-black",
          dark: true,
        },
      ],
    };
  },
};
</script>