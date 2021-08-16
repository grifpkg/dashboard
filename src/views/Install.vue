<template>
  <div>
    <center>
      <h1 style="font-size: 24px; margin-top: 30px">
        You're about to make your life a whole lot easier
      </h1>
      <p style="margin-bottom: 30px">
        Latest Release:
        {{
          latestRelease.date != null
            ? latestRelease.date.toLocaleString()
            : "unknown"
        }}
      </p>

      <div style="max-width: 500px">
        <b-tabs
          expanded
          v-if="latestRelease.date != null"
          v-model="selectedTab"
          position="is-centered"
          type="is-toggle"
        >
          <b-tab-item label="Windows" icon="windows">
            <div>
              <a
                download
                @click="selected = 'grif_windows_x64.exe'"
                :href="latestRelease.files['grif_windows_x64.exe']"
              >
                <b-button
                  style="margin-bottom: 5px"
                  expanded
                  icon-left="download"
                  type="is-light"
                >
                  Download x64
                </b-button>
              </a>
              <a
                download
                @click="selected = 'grif_windows_x32.exe'"
                :href="latestRelease.files['grif_windows_x32.exe']"
              >
                <b-button
                  style="margin-bottom: 5px"
                  expanded
                  icon-left="download"
                  type="is-light"
                >
                  Download x32
                </b-button></a
              >
            </div>
          </b-tab-item>
          <b-tab-item label="Linux" icon="linux">
            <a
              download
              @click="selected = 'grif_linux_x64'"
              :href="latestRelease.files['grif_linux_x64']"
              ><b-button
                style="margin-bottom: 5px"
                expanded
                icon-left="download"
                type="is-light"
              >
                Download x64
              </b-button></a
            >
            <a
              download
              @click="selected = 'grif_linux_x32'"
              :href="latestRelease.files['grif_linux_x32']"
              ><b-button
                style="margin-bottom: 5px"
                expanded
                icon-left="download"
                type="is-light"
              >
                Download x32
              </b-button></a
            >
            <a
              download
              @click="selected = 'grif_linux_x64_arm'"
              :href="latestRelease.files['grif_linux_x64_arm']"
              ><b-button
                style="margin-bottom: 5px"
                expanded
                icon-left="download"
                type="is-light"
              >
                Download ARM x64
              </b-button></a
            >
          </b-tab-item>
          <b-tab-item label="MacOS" icon="apple">
            <a
              download
              @click="selected = 'grif_macos_x64'"
              :href="latestRelease.files['grif_macos_x64']"
              ><b-button
                style="margin-bottom: 5px"
                expanded
                icon-left="download"
                type="is-light"
              >
                Download x64
              </b-button></a
            >
            <a
              download
              @click="selected = 'grif_macos_x64_arm'"
              :href="latestRelease.files['grif_macos_x64_arm']"
              ><b-button
                style="margin-bottom: 5px"
                expanded
                icon-left="download"
                type="is-light"
              >
                Download ARM x64
              </b-button></a
            >
          </b-tab-item>
          <b-tab-item label="OpenBSD" icon="fish">
            <a
              download
              @click="selected = 'grif_openbsd_x64'"
              :href="latestRelease.files['grif_openbsd_x64']"
              ><b-button
                style="margin-bottom: 5px"
                expanded
                icon-left="download"
                type="is-light"
              >
                Download x64
              </b-button></a
            >
            <a
              download
              @click="selected = 'grif_openbsd_x32'"
              :href="latestRelease.files['grif_openbsd_x32']"
              ><b-button
                style="margin-bottom: 5px"
                expanded
                icon-left="download"
                type="is-light"
              >
                Download x32
              </b-button></a
            >
            <a
              download
              @click="selected = 'grif_openbsd_x64_arm'"
              :href="latestRelease.files['grif_openbsd_x64_arm']"
              ><b-button
                style="margin-bottom: 5px"
                expanded
                icon-left="download"
                type="is-light"
              >
                Download ARM x64
              </b-button></a
            >
          </b-tab-item>
        </b-tabs>
        <div
          v-if="selected != null"
          style="text-align: left; margin-bottom: 10px"
        >
          <b-message v-if="selected.endsWith('.exe')" type="is-black">
            <ul>
              <li>Execute <b-icon icon="windows"></b-icon> + R</li>
              <li>Enter "cmd"</li>
              <li>Use <code>cd [your-downloads-folder]</code></li>
              <li>
                Use <code>{{ selected }} upgrade</code>
              </li>
              <li>Use <code>grif --help</code></li>
            </ul>
          </b-message>
          <b-message v-if="!selected.endsWith('.exe')" type="is-black">
            <ul>
              <li>Open the terminal</li>
              <li>Use <code>cd [your-downloads-folder]</code></li>
              <li>
                Use <code>sudo ./{{ selected }} upgrade</code>
              </li>
              <li>Use <code>grif --help</code></li>
            </ul>
          </b-message>
        </div>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=grifpkg&repo=cli&type=star&count=false&size=large"
          frameborder="0"
          scrolling="0"
          width="74"
          height="30"
          title="GitHub"
        ></iframe>
        <a
          style="margin-left: 10px"
          target="_blank"
          href="https://www.buymeacoffee.com/happy"
          ><img
            width="145px"
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=happy&button_colour=f5f5f5&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
        /></a>
      </div>
    </center>
  </div>
</template>

<script>
import UAParser from "ua-parser-js";
export default {
  data: () => {
    return {
      selectedTab: 0,
      selected: null,
      latestRelease: {
        date: null,
        files: {},
      },
    };
  },
  watch: {
    selectedTab() {
      this.selected = null;
    },
  },
  methods: {
    getLatestRelease() {
      let main = this;
      fetch("https://api.github.com/repos/grifpkg/cli/releases/latest")
        .then((response) => response.json())
        .then((data) => {
          main.latestRelease.date = new Date(data.published_at);
          data.assets.forEach((element) => {
            main.latestRelease.files[element.name] =
              element.browser_download_url;
          });
        });
    },
  },
  mounted() {
    this.getLatestRelease();
    const os = String(new UAParser().getResult().os.name)
      .replace(/\s/g, "")
      .toLowerCase();
    switch (os) {
      case "macos":
        this.selectedTab = 2;
        break;
      case "windows":
        this.selectedTab = 0;
        break;
      case "linux":
        this.selectedTab = 1;
        break;
      case "openbsd":
        this.selectedTab = 3;
        break;

      default:
        break;
    }
  },
};
</script>
<style>
.tab-content {
  margin-top: 10px;
  padding: 0px !important;
}
</style>