<template>
  <div>
    <b-modal
      v-model="addingSource"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Add source"
      aria-modal
    >
      <template #default="props">
        <div>
          <div class="modal-card" style="max-width: 400px">
            <header class="modal-card-head">
              <b-tabs v-model="addingSourceType" style="height: 20px">
                <b-tab-item label="Card" />
              </b-tabs>
            </header>
            <section class="modal-card-body">
              <div ref="cardElement"></div>
            </section>
            <footer class="modal-card-foot">
              <b-button @click="props.close()" label="Close" />
              <b-button @click="createSource()" label="Add" />
            </footer>
          </div>
        </div>
      </template>
    </b-modal>
    <a v-if="!loaded" class="panel-block" style="padding: 14px">
      <b-skeleton size="is-large" :count="1" />
    </a>
    <a
      v-for="source in this.sources.sources"
      :key="source.id"
      class="panel-block"
      style="padding: 14px"
    >
      <b-tag
        v-if="source.id == sources.default"
        style="margin-right: 10px"
        type="is-info is-light"
        >default</b-tag
      >
      <b-tag style="margin-right: 10px">{{ source.object }}</b-tag>
      <span class="code">{{ getSourceIdentifier(source) }}</span>
    </a>
    <a
      @click="addingSource = true"
      class="panel-block"
      style="padding: 14px; padding-left: 24px"
    >
      <span class="panel-icon">
        <i class="fas fa-plus" aria-hidden="true"></i>
      </span>
      Add new
      <div style="position: absolute; right: 0px; padding-right: 24px">
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
    </a>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getSources();
  },
  watch: {
    addingSource(newv) {
      if (newv) {
        this.addingSourceType = 0;
      } else {
        this.addingSourceType = -1;
      }
    },
    addingSourceType(type) {
      if (type != null && type >= 0) {
        setTimeout(() => {
          switch (type) {
            case 0:
              this.element = this.$stripe().elements().create("card");
              break;
            default:
              break;
          }
          this.element.mount(this.$refs.cardElement);
        }, 1);
      }
    },
  },
  methods: {
    createSource() {
      let main = this;
      this.$stripe()
        .createSource(this.element)
        .then(function (result) {
          if (result.error != null) return;
          main.addingSource = false;
          main.loaded = false;
          main.$client
            .getSession()
            .getAccount()
            .attachSource(result.source.id)
            .finally(() => {
              main.getSources();
            });
        });
    },
    getSourceIdentifier(source) {
      if (source.object == "card") {
        return `${
          source.tokenization_method != null
            ? source.tokenization_method + " "
            : ""
        }${source.brand} •••• ${source.last4}`;
      } else if (source.object == "sepa_debit") {
        return `${source.bank_name} ${source.routing_number} ${source.account_holder_name} (${source.account_type})`;
      } else if (source.object == "alipay") {
        return `${source.username}`;
      }
    },
    getSources() {
      this.loaded = false;
      this.$client
        .getSession()
        .getAccount()
        .listSources()
        .then((sources) => {
          this.sources = sources;
          console.log(sources);
        })
        .finally(() => {
          this.loaded = true;
        });
    },
  },
  data: () => {
    return {
      element: null,
      addingSourceType: null,
      addingSource: false,
      loaded: false,
      sources: {
        default: -1,
        sources: [],
      },
    };
  },
};
</script>