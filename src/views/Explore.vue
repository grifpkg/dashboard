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
  </div>
</template>
<script>
import CopyBar from "@/components/CopyBar";
export default {
  components: {
    CopyBar,
  },
  data: () => {
    return {
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