<template>
  <v-container>
    <h1 class="text-center my-3">
      robot <v-icon class="ml-2" size="24px">mdi-robot</v-icon>
    </h1>
    <v-card class="my-6">
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          title="What is robot.grifpkg.com?"
          text="robot.grifpkg.com is our proxy server for indexing-related requests. It allows grifpkg to ensure resources are browsable and quickly downloadable, fairly disclaiming the sources and never showing in-detail data on our site, we always refer the source URL and clearly disclaim the last data age. So, in short, it's pretty similar to something like Google or duckduckgo, we just look for the data before hand (preprocessing) so once CLI users needed it, it's available instantly."
        >
        </v-expansion-panel>
        <v-expansion-panel
          title="Why use an indexing robot?"
          text="We only fetch data using our robot when the data is not reachable directly from the CLI. This usually happens because some sites use services such as Cloudflare preventing data fetch outside normal browser behavior. We are able to forward this data to the CLI because private agreements with the site owners. We developed an indexing robot that is compatible and respectful with all of your favorite sites. We only do about 60 calls per minute per domain."
        >
        </v-expansion-panel>
        <v-expansion-panel
          title="Why cache data?"
          text="We have a thin cache layer (LRU) for data reachable directly from the CLI, and a persisent cache layer for data completely unreachable from the client. We clearly disclaim copyright notices. This cache layer also diminishes the load on the source sites. We have to do this with some data, or the package manager wouldn't be able to fetch data without using our private agreements, or it would be far too unresponsive in some cases to actually be useful."
        >
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <template v-if="robosocket">
      <v-expand-transition>
        <v-card v-if="hasData" class="mb-6 pt-5">
          <apexchart
            type="area"
            ref="chart"
            :height="150"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </v-card>
      </v-expand-transition>
      <v-card class="mb-6" v-for="bucket in robosocket.tasks" :key="bucket.tid">
        <v-sheet color="black" class="py-4 px-6">
          <v-row>
            <v-col>
              {{ bucket.name }}
            </v-col>
            <v-col cols="auto">
              <v-slide-x-reverse-transition>
                <div v-if="bucket.children.length <= 0">
                  <v-icon color="primary"> mdi-check </v-icon>
                  <v-tooltip activator="parent" theme="light">
                    Up to date
                  </v-tooltip>
                </div>
              </v-slide-x-reverse-transition>
            </v-col>
          </v-row>
        </v-sheet>
        <v-template v-if="bucket.children.length > 0">
          <v-divider />
          <div class="pa-3">
            <v-row>
              <v-col
                cols="3"
                md="2"
                v-for="cacheTrigger in bucket.children"
                :key="cacheTrigger.tid"
              >
                <div class="pa-3 text-center">
                  <v-progress-circular
                    :indeterminate="cacheTrigger.indeterminate"
                    :model-value="cacheTrigger.progress"
                    color="primary"
                    size="64"
                  >
                    <span style="font-size: 24px">
                      <v-badge
                        :model-value="cacheTrigger.children.length > 0"
                        color="primary"
                        :content="cacheTrigger.children.length"
                      >
                        📦
                      </v-badge>
                    </span>
                  </v-progress-circular>
                  <v-menu
                    offset="0 100"
                    location="bottom"
                    open-on-hover
                    activator="parent"
                  >
                    <v-card width="300px">
                      <div class="pa-3" style="overflow: hidden">
                        <cache-progress :task="cacheTrigger" />
                      </div>
                      <template v-if="cacheTrigger.children.length > 0">
                        <v-divider />
                        <div class="pa-3">
                          <cache-progress
                            v-for="task in cacheTrigger.children"
                            :key="task.tid"
                            :task="task"
                          />
                        </div>
                      </template>
                    </v-card>
                  </v-menu>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-template>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import CacheProgress from "@/components/CacheProgress.vue";
import Robosocket from "@/assets/Robosocket.ts";

export default {
  components: {
    CacheProgress,
  },
  data: () => ({
    robosocket: null,
    hasData: false,
    chartOptions: {
      chart: {
        sparkline: {
          enabled: true,
        },
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 300,
          },
        },
      },
      colors: ["#ff6d00"],
      xaxis: {
        type: "datetime",
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        opacity: 0.7,
      },
      yaxis: {
        min: 0,
      },
      tooltip: {
        enabled: false,
      },
    },
    series: [
      {
        data: [].slice(),
      },
    ],
  }),
  mounted() {
    this.robosocket = new Robosocket();
    this.robosocket.listen();
    let main = this;
    let data = this.series[0].data;
    setInterval(() => {
      const count = this.robosocket.tasks
        .map((bucket) => bucket.children.length)
        .reduce((a, b) => a + b, 0);
      data.push([new Date().getTime(), count]);
      if (this.hasData) {
        main.$refs.chart.updateSeries([{ data }]);
      }
      if (!this.hasData && count) this.hasData = true;
      if (data.length > 300) data.shift();
    }, 300);
  },
};
</script>