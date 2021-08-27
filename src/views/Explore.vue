<template>
  <div>
    <div class="card" style="overflow: hidden">
      <b-carousel :indicator="false">
        <b-carousel-item v-for="element in featured" :key="element.name">
          <section :class="`hero is-black ${element.color}`">
            <div
              class="hero-body"
              style="padding-left: 70px; padding-right: 70px"
            >
              <h1 class="title">{{ element.name }}</h1>
              <p style="margin-bottom: 8px" class="subtitle">
                {{ element.description }}
              </p>

              <CopyBar :value="element.name" :dark="element.dark" />
            </div>
          </section>
        </b-carousel-item>
      </b-carousel>
    </div>
    <div>
      <Resource
        v-for="resource in resources"
        :key="resource.id"
        :resource="resource"
      />
    </div>

    <infinite-loading
      v-if="!loadingResources && page < 9"
      @infinite="loadResources"
    >
    </infinite-loading>
    <transition name="fadeIn">
      <div
        style="padding-top: 32px; padding-bottom: 32px"
        v-if="loadingResources"
      >
        <b-progress></b-progress>
      </div>
    </transition>
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
import InfiniteLoading from "vue-infinite-loading";
export default {
  components: {
    CopyBar,
    InfiniteLoading,
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