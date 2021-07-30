<template>
  <div>
    <div class="columns">
      <div class="column is-half" style="padding-bottom: 0px">
        <b-field label-position="on-border" label="Full Name">
          <b-input
            :disabled="!loaded"
            type="text"
            :loading="!loaded"
            v-model="address.name"
          />
        </b-field>
      </div>
      <div class="column is-half" style="padding-bottom: 0px">
        <b-field label-position="on-border" label="Phone">
          <b-input
            :disabled="!loaded"
            type="text"
            :loading="!loaded"
            v-model="address.phone"
          />
        </b-field>
      </div>
    </div>
    <b-field label-position="on-border" label="Line 1">
      <b-input
        :disabled="!loaded"
        type="text"
        :loading="!loaded"
        v-model="address.address.line1"
      />
    </b-field>
    <b-field label-position="on-border" label="Line 2">
      <b-input
        :disabled="!loaded"
        type="text"
        :loading="!loaded"
        v-model="address.address.line2"
      />
    </b-field>
    <div class="columns">
      <div class="column is-half" style="padding-bottom: 0px">
        <b-field label-position="on-border" label="City">
          <b-input
            :disabled="!loaded"
            type="text"
            :loading="!loaded"
            v-model="address.address.city"
          />
        </b-field>
      </div>
      <div class="column is-half" style="padding-bottom: 0px">
        <b-field label-position="on-border" label="Postal Code">
          <b-input
            :disabled="!loaded"
            type="text"
            :loading="!loaded"
            v-model="address.address.postal_code"
          />
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half" style="padding-bottom: 0px">
        <b-field label-position="on-border" label="Country">
          <b-select
            :disabled="!loaded"
            :loading="!loaded"
            expanded
            v-model="selectedCountry"
          >
            <option
              v-for="country in countries"
              :value="country.countryShortCode"
              :key="country.countryShortCode"
            >
              {{ country.countryName }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="column is-half" style="padding-bottom: 0px">
        <b-field label-position="on-border" label="Region">
          <b-select
            :disabled="regions.length == 0 || !loaded"
            :loading="!loaded"
            expanded
            v-model="selectedRegion"
          >
            <option
              v-for="region in regions"
              :value="region.name"
              :key="region.name"
            >
              {{ region.name }}
            </option>
          </b-select>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half" style="padding-bottom: 0px">
        <b-button @click="save()" :loading="saving" :disabled="!loaded"
          >Save Changes</b-button
        >
      </div>
      <div
        class="column is-half"
        style="padding-bottom: 0px; text-align: right"
      >
        <b-tooltip
          multilined
          label="we don't store your billing address or payment sources on our servers, we let Stripe take care of that with propper data encryption"
          position="is-left"
          type="is-white"
        >
          <b-button
            style="color: gray !important"
            icon-right="cc-stripe"
            icon-pack="fas"
            type="is-ghost"
            >Powered by Stripe</b-button
          >
        </b-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import data from "country-region-data";
export default {
  watch: {
    selectedCountry(newv) {
      this.address.address.country = newv;
      if (newv == null) {
        this.regions = [];
      } else {
        this.countries.forEach((country) => {
          if (country.countryShortCode == newv) {
            this.regions = country.regions;
            if (this.regions.length <= 0) this.selectedRegion = null;
            return;
          }
        });
      }
    },
    selectedRegion(newv) {
      this.address.address.state = newv;
    },
  },
  mounted() {
    this.countries = data;
    this.update();
  },
  methods: {
    save() {
      let address = this.address;
      this.loaded = false;
      this.saving = true;
      this.$client
        .getSession()
        .getAccount()
        .setBillingAddress(
          address.address.line1,
          address.address.line2,
          address.address.postal_code,
          address.address.city,
          address.address.state,
          address.address.country,
          address.phone,
          address.name
        )
        .finally(() => {
          this.saving = false;
          this.update();
        });
    },
    update() {
      this.loaded = false;
      this.$client
        .getSession()
        .getAccount()
        .getBillingAddress()
        .then((address) => {
          this.address = address;
          this.selectedCountry = address.address.country;
          this.selectedRegion = address.address.state;
          this.loaded = true;
        });
    },
  },
  data: () => {
    return {
      selectedCountry: null,
      selectedRegion: null,
      countries: [],
      regions: [],
      loaded: false,
      saving: false,
      address: {
        address: {
          line1: null,
          line2: null,
          city: null,
          country: null,
          state: null,
          postal_code: null,
        },
        phone: null,
        name: null,
      },
    };
  },
};
</script>