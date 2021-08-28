<template>
  <div>
    <div v-if="resourceId == null">
      <b-message type="is-danger">
        Resource selecting from this UI is not implemented yet, you should pass
        the resource id directly on with the uri with /suggest/:resourceId. This
        feature will be implemeneted soon and you'll be able to browse through
        resources needing url suggestions.
      </b-message>
    </div>
    <b-loading :is-full-page="true" v-model="loadingResource"></b-loading>
    <b-loading :is-full-page="true" v-model="loadingReleases"></b-loading>
    <b-loading :is-full-page="true" v-model="testing"></b-loading>
    <b-message v-if="resourceError != null" type="is-danger">
      {{ resourceError }}
    </b-message>
    <transition name="fadeIn">
      <div v-if="resource != null">
        <h1 style="font-weight: 700; margin-bottom: 10px; margin-top: 10px">
          Suggest a download url for <i>"{{ resource.name }}"</i>
          <b-taglist style="display: inline; margin-left: 10px" attached>
            <b-tag type="is-light">{{ resource.id }}</b-tag>
            <b-tag type="is-light is-primary">{{
              resource.resourceId
            }}</b-tag> </b-taglist
          >, targeting...
        </h1>
        <div class="columns" style="margin-bottom: 0px">
          <div class="column">
            <b-button
              expanded
              @click="targetType = 0"
              :type="`is-light ${targetType == 0 ? 'is-primary' : ''}`"
              style="padding-top: 70px; padding-bottom: 70px"
              >Whole Resource</b-button
            >
          </div>
          <div class="column">
            <b-button
              expanded
              @click="targetType = 1"
              :type="`is-light ${targetType == 1 ? 'is-primary' : ''}`"
              style="padding-top: 70px; padding-bottom: 70px"
              >Single Release</b-button
            >
          </div>
        </div>

        <b-message type="is-black">
          When suggesting a download url for the whole resource, grifpkg will
          automatically test the url schema for all the releases.
          <b
            >If there is no way to match version-specific url schemas, first
            suggest download urls using the "single release" option, then
            suggest a "whole resource" pointing to the latest downloadable
            file</b
          >
          if the latest file can be built onto an url schema. Releases with the icon <b-icon icon="tasks" pack="fas"/> have some suggested URLs already.
        </b-message>
      </div>
    </transition>
    <transition name="fadeIn">
      <div v-if="targetType == 1 && availableReleases != null">
        <h1 style="font-weight: 700; margin-bottom: 10px; margin-top: 20px">
          Targeting release...
        </h1>
        <b-message v-if="releaseError != null" type="is-danger">
          {{ releaseError }}
        </b-message>
        <div style="max-height: 500px; overflow-y: auto">
          <div v-for="release in availableReleases" :key="release.id">
            <b-button
              v-if="release.hasSuggestions != null"
              icon-right="tasks"
              icon-pack="fas"
              @click="targetRelease = release"
              expanded
              :type="`is-light ${targetRelease == release ? 'is-primary' : ''}`"
              style="margin-bottom: 5px"
              >{{ release.version }}</b-button
            >
          </div>
        </div>
      </div>
    </transition>
    <transition name="fadeIn">
      <div
        v-if="targetType >= 0 && !(targetType == 1 && targetRelease == null)"
      >
        <h1 style="font-weight: 700; margin-bottom: 10px; margin-top: 20px">
          With the URL scheme...
        </h1>
        <b-message type="is-black">
          You can use the following variables on the URL scheme and JSON URL
          <ul>
            <li>
              <code v-pre>{{ releaseVersion }}</code> version tag, ex:
              <i>{{ latestRelease.version }}</i> (latest available for this
              resource)
            </li>
            <li>
              <code v-pre>{{ releaseId }}</code> release id on the external
              service, ex: <i>{{ latestRelease.releaseId }}</i>
            </li>
            <li>
              <code v-pre>{{ releaseCreation }}</code> release creation unix
              timestamp, ex: <i>{{ latestRelease.creation.getTime() }}</i>
            </li>
            <li>
              <code v-pre>{{ resourceName }}</code> resource name, ex:
              <i>{{ resource.name }}</i>
            </li>
            <li>
              <code v-pre>{{ resourceId }}</code> resource id on the external
              service, ex: <i>{{ resource.resourceId }}</i>
            </li>
            <li>
              <code v-pre>{{ jsonResult }}</code> json value, get it using json
              data sourcing and
              <a target="_blank" href="https://jsonpath.com/">json path</a>
            </li>
          </ul>
        </b-message>
        <b-field label-position="on-border" label="URL Schema Templates">
          <b-select
            v-model="jsonTemplate"
            placeholder="Select a template"
            expanded
          >
            <option value="none">None</option>
            <option value="github">GitHub Releases</option>
            <option value="jenkins">Jenkins Builds</option>
          </b-select>
        </b-field>
        <b-field label-position="on-border" label="URL Schema">
          <b-input v-model="urlSchema"></b-input>
        </b-field>
        <b-field label-position="on-border" label="URL Result">
          <b-input expanded disabled v-model="finalURL"></b-input>
          <p class="control">
            <b-button
              tag="a"
              :href="finalURL"
              target="_blank"
              class="button is-light"
            >
              <b-icon pack="fas" icon="external-link-alt"></b-icon
            ></b-button>
          </p>
        </b-field>
        <b-field>
          <b-switch v-model="jsonDataSourcing"
            >Use JSON data for building a download URL</b-switch
          >
        </b-field>
        <transition name="fadeIn">
          <div v-if="jsonDataSourcing">
            <b-field label-position="on-border" label="JSON URL">
              <b-input v-model="jsonURL"></b-input>
            </b-field>
            <b-field label-position="on-border" label="JSON URL Result">
              <b-input disabled v-model="finalJsonURL"></b-input>
            </b-field>
            <b-field label-position="on-border" label="JSON Path">
              <b-input v-model="jsonPath"></b-input>
            </b-field>
            <b-field label-position="on-border" label="JSON Path Result">
              <b-input disabled v-model="jsonResult"></b-input>
            </b-field>
            <b-message
              style="margin: 0px"
              v-model="showJsonError"
              type="is-danger"
            >
              Error while fetching JSON: {{ jsonError }}. If the end resource
              has CORS enabled, the backend will still be able to get the JSON
              data, but it wont available for preview here.
            </b-message>
            <b-progress v-if="showJsonLoading" size="is-small"></b-progress>
            <div
              style="
                overflow-x: auto;
                overflow-y: auto;
                position: relative;
                max-height: 300px;
                margin-bottom: 0px;
              "
            >
              <highlight-code
                style="padding: 0px; margin-bottom: 10px; border-radius: 5px"
                v-if="jsonData != null && !showJsonLoading && !showJsonError"
                lang="json"
                :code="jsonData"
              />
            </div>
          </div>
        </transition>
        <b-button
          style="margin-top: 10px; padding-top: 24px; padding-bottom: 24px"
          expanded
          :loading="validURLChecking"
          :disabled="!validURL"
          @click="submit()"
          type="is-black"
        >
          Submit Suggestion
        </b-button>
      </div>
    </transition>
    <transition name="fadeIn">
      <div v-if="tests != null" style="margin-top: 10px">
        <div class="columns">
          <div class="column">
            <b-notification class="is-black" :closable="false">
              <b-icon pack="fas" icon="check" />
              {{ successfulTests.length }} Successful Tests
            </b-notification>
          </div>
          <div class="column">
            <b-notification class="is-danger is-light" :closable="false">
              <b-icon pack="fas" icon="times" /> {{ failedTests.length }} Failed
              Tests
            </b-notification>
          </div>
        </div>
        <div ref="testResults" style="max-height: 860px; overflow-y: auto">
          <b-notification
            style="margin: 0px; margin-bottom: 10px"
            v-for="(test, i) in tests"
            :key="i"
            has-icon
            icon-pack="fas"
            :icon="test.result ? 'check' : 'times'"
            :closable="false"
          >
            <div
              v-if="!test.result"
              style="text-overflow: ellipsis; overflow: hidden"
            >
              Failed for release {{ test.release.id }} with external id
              {{ test.release.releaseId }} and version tag
              <u
                ><b>{{ test.release.version }}</b></u
              >: <b>{{ test.message }}</b>
            </div>
            <div
              v-if="test.result"
              style="text-overflow: ellipsis; overflow: hidden"
            >
              Successfully generated
              <a target="_blank" :href="test.urlSuggestion.url"
                >downloadable url</a
              >
              for release {{ test.release.id }} with external id
              {{ test.release.releaseId }} and version tag
              <u
                ><b>{{ test.release.version }}</b></u
              >
            </div>
          </b-notification>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import VueScrollTo from "vue-scrollto";
import { JSONPath } from "jsonpath-plus";
import { Resource } from "@grifpkg/client";
export default {
  props: ["resourceId", "account"],
  data: () => {
    return {
      validURLChecking: false,
      validURL: false,
      jsonTemplate: null,
      latestRelease: null,
      loadingReleases: false,
      loadingResource: false,
      releaseError: null,
      availableReleases: null,
      resource: null,
      resourceError: null,
      targetType: -1,
      targetRelease: null,
      jsonDataSourcing: false,
      jsonData: null,
      jsonURL: null,
      jsonPath: null,
      jsonError: null,
      jsonResult: null,
      showJsonError: false,
      showJsonLoading: false,
      urlSchema: null,
      finalURL: null,
      finalJsonURL: null,
      lastJsonChange: 0,
      tests: null,
      successfulTests: [],
      failedTests: [],
      testing: false,
    };
  },
  mounted() {
    this.checkAccount(this.account);
  },
  methods: {
    checkAccount(acc) {
      if (acc == null && !this.loggingIn) {
        this.$emit("checkAccount");
        this.loggingIn = true;
      } else {
        if (this.resourceId != null) {
          this.loadResource();
        }
      }
    },
    submit() {
      let main = this;
      switch (this.targetType) {
        case 0:
          main.testing = true;
          this.resource
            .suggest(
              this.urlSchema,
              this.jsonDataSourcing ? this.jsonURL : null,
              this.jsonDataSourcing ? this.jsonPath : null
            )
            .then((tests) => {
              main.processTests(tests);
            })
            .finally(() => {
              main.testing = false;
            });
          break;
        case 1:
          main.testing = true;
          this.targetRelease
            .suggest(
              this.urlSchema,
              this.jsonDataSourcing ? this.jsonURL : null,
              this.jsonDataSourcing ? this.jsonPath : null
            )
            .then((tests) => {
              main.processTests(tests);
            })
            .finally(() => {
              main.testing = false;
            });
          break;

        default:
          break;
      }
    },
    processTests(tests) {
      if (!Array.isArray(tests)) {
        tests = [tests];
      }
      this.tests = tests;
      this.successfulTests = [];
      this.failedTests = [];
      tests.forEach((test) => {
        if (test.result) {
          this.successfulTests.push(test);
        } else {
          this.failedTests.push(test);
        }
      });
      setTimeout(() => {
        VueScrollTo.scrollTo(this.$refs["testResults"], 500);
      }, 1);
    },
    loadLatestRelease() {
      let main = this;
      main.releaseError = null;
      main.loadingReleases = true;
      this.resource
        .getRelease()
        .then((release) => {
          main.latestRelease = release;
        })
        .catch((err) => {
          main.releaseError = err.message;
        })
        .finally(() => {
          main.loadingReleases = false;
        });
    },
    loadResource() {
      this.targetRelease = null;
      this.targetType = -1;
      this.availableReleases = null;
      this.loadingResource = true;
      this.resourceError = null;
      let main = this;
      Resource.fromId(this.resourceId)
        .then((resource) => {
          main.resource = resource;
          main.loadLatestRelease();
        })
        .catch((err) => {
          main.resourceError = err.message;
        })
        .finally(() => {
          main.loadingResource = false;
        });
    },
    calcJson() {
      this.jsonResult = JSONPath({
        path: this.jsonPath,
        json: JSON.parse(this.jsonData),
      });
    },
    calcFinalURL(val) {
      let release = {
        creation: 0,
        releaseId: "exampleReleaseId",
        version: "exampleVersionTag",
      };
      if (this.latestRelease != null) release = this.latestRelease;
      if (this.targetRelease != null) release = this.targetRelease;
      return val
        .replace("{{resourceName}}", this.resource.name)
        .replace("{{resourceId}}", this.resource.resourceId)
        .replace(
          "{{releaseCreation}}",
          typeof release.creation != "number"
            ? release.creation.getTime() / 1000
            : release.creation
        )
        .replace("{{releaseId}}", release.releaseId)
        .replace("{{releaseVersion}}", release.version)
        .replace(
          "{{jsonResult}}",
          this.jsonResult == null ? "invalidJsonResult" : this.jsonResult
        );
    },
    fetchJSON(newu) {
      this.tests = null;
      let main = this;
      this.finalJsonURL = this.calcFinalURL(newu);
      if (newu.length > 0) {
        let validURL = this.isValidURL(this.finalJsonURL);

        if (!validURL) {
          main.checkFinalURL();
          main.jsonError = "Invalid URL";
          main.showJsonError = true;
          main.showJsonLoading = false;
          main.jsonData = null;
          main.jsonResult = null;
        } else {
          this.lastJsonChange = new Date().getTime();
          main.jsonError = null;
          main.showJsonError = false;
          main.showJsonLoading = true;
          main.jsonData = null;
          main.jsonResult = null;
          setTimeout(() => {
            if (new Date().getTime() - this.lastJsonChange >= 2000) {
              fetch(this.finalJsonURL, {
                headers: {
                  accept: "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  main.jsonData = JSON.stringify(data, null, 2);
                  main.showJsonError = false;
                  try {
                    if (!String(main.jsonPath).startsWith("$.")) {
                      main.jsonPath = "$." + String(Object.keys(data)[0]);
                    }
                    if (main.jsonPath.length > 0) main.calcJson();
                  } catch (error) {
                    // ignore
                  }
                })
                .catch((err) => {
                  main.jsonError = err.message;
                  main.showJsonError = true;
                  main.checkFinalURL();
                })
                .finally(() => {
                  main.showJsonLoading = false;
                });
            }
          }, 2000);
        }
      } else {
        main.jsonError = null;
        main.showJsonError = false;
        main.showJsonLoading = false;
        main.jsonData = null;
        main.jsonResult = null;
      }
    },
    isValidURL(str) {
      let validURL = true;
      try {
        let url = new URL(str);
        validURL = url.protocol === "http:" || url.protocol === "https:";
      } catch (err) {
        validURL = false;
      }
      return validURL;
    },
    checkFinalURL() {
      this.validURLChecking = true;
      this.validURL = false;
      setTimeout(() => {
        this.validURLChecking = false;
        if (this.showJsonError) {
          // output might be valid on the backend
          this.validURL = this.isValidURL(this.finalJsonURL);
        } else {
          this.validURL = this.isValidURL(this.finalURL);
        }
      }, 2000);
    },
  },
  watch: {
    finalURL() {
      this.tests = null;
      this.checkFinalURL();
    },
    targetRelease() {
      if (this.jsonDataSourcing) {
        this.fetchJSON(this.jsonURL);
      }
      this.finalJsonURL = this.calcFinalURL(this.jsonPath);
      this.finalURL = this.calcFinalURL(this.urlSchema);
    },
    jsonTemplate(newv) {
      if (newv != null) {
        if (newv != "none")
          this.$buefy.toast.open(
            "make sure to replace the values surrounded by <>"
          );

        switch (newv) {
          case "github":
            this.jsonDataSourcing = true;
            this.jsonPath = "$.assets[0].browser_download_url";
            this.jsonURL =
              "https://api.github.com/repos/<author>/<repoName>/releases/tags/{{releaseVersion}}";
            this.urlSchema = "{{jsonResult}}";
            break;
          case "jenkins":
            this.jsonDataSourcing = true;
            this.jsonPath = "$.jobs[?(@.name == '<jobName>')].builds[0].number";
            this.jsonURL =
              "https://<website.com>/<jenkinsPath>/api/json?tree=jobs[builds[number],name]";
            this.urlSchema =
              "https://<website.com>/<jenkinsPath>/job/<jobName>/{{jsonResult}}/artifact/*zip*/archive.zip";
            break;
          default:
            this.jsonDataSourcing = false;
            this.jsonPath = null;
            this.jsonURL = null;
            this.urlSchema = null;
            this.jsonResult = null;
            this.finalURL = null;
            break;
        }
        setTimeout(() => {
          this.jsonTemplate = null;
        }, 1);
      }
    },
    urlSchema(val) {
      this.finalURL = this.calcFinalURL(val);
    },
    jsonResult() {
      this.finalJsonURL = this.calcFinalURL(this.jsonURL);
      this.finalURL = this.calcFinalURL(this.urlSchema);
      this.checkFinalURL();
    },
    targetType(newv) {
      this.tests = null;
      if (newv == 1 && this.availableReleases == null) {
        let main = this;
        main.releaseError = null;
        main.loadingReleases = true;
        this.resource
          .getReleases()
          .then((releases) => {
            main.availableReleases = releases;
          })
          .catch((err) => {
            main.releaseError = err.message;
          })
          .finally(() => {
            main.loadingReleases = false;
          });
      }
    },
    jsonPath() {
      if (this.jsonData != null) this.calcJson();
    },
    jsonURL(newu) {
      this.fetchJSON(newu);
    },
  },
};
</script>