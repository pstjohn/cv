<template>
  <div class="item grants-entry">
    <div>
      <div class="meta">
        <div>
          <h3 class="grant-title d-lg-inline">{{ title }}</h3>
        </div>
        <div>
          <div class="d-lg-inline">{{ organization }}</div>
          <div class="d-lg-inline float-lg-end">{{ time }}</div>
        </div>
        <div>
          <div class="d-lg-inline">
            Total Funding: <span class="amount" v-text="amount" />
          </div>
          <div class="d-lg-inline float-lg-end">Lead PI: {{ pi }}</div>
        </div>
        <div>
          <div class="d-lg-inline"><a :href="link">[More Info]</a></div>
        </div>
      </div>
      <div class="details">
        <slot></slot>
        <div class="image">
          <slot name="image"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GrantsEntry',
  props: {
    title: String,
    time: String,
    pi: String,
    organization: String,
    link: String,
    amount: String,
  },
};
</script>

<style lang="scss">
.grants-entry {
  // flex-direction: column;

  // margin-bottom: 15px !important;

  .details {
    display: flex;
    align-self: start;
    align-items: center;
    break-inside: avoid-page;

    p {
      margin-bottom: 0;
    }
  }

  .image {
    float: right;
    display: flex;

    img {
      margin-left: 15px;
      max-width: 150px;
    }
  }

  .meta {
    // color: $text-color-secondary;
    .grant-title {
      font-size: 14px;
      margin-top: 0px;
    }

    .amount {
      font-weight: 700;
    }
  }
}

@media (max-width: 575px) {
  .details {
    display: block !important;

    .image {
      display: block !important;
      text-align: center;
      float: none !important;

      img {
        margin-left: 15px;
        max-width: 150px;
      }
    }
  }
}

@media print {
  .image img {
    display: none; //maybe fix this at some point
  }
}
</style>
