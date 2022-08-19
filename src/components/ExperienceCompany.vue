<template>
  <div>
    <div class="header">
      <div class="logo">
        <slot name="logo"></slot>
      </div>
      <div class="headerText">
        <h1>
          <span class="job-title" v-text="company" />
          <span class="location" v-text="location" v-if="location" />
        </h1>
        <span class="time">
          <span v-text="startDateFormat" /> -
          <span v-text="endDateFormat" /> &bull;
          <span class="duration" v-text="duration" />
        </span>
      </div>
    </div>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperienceCompany',
  props: {
    logo_path: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
  },
  computed: {
    duration() {
      let start = new Date(this.startDate);
      let end = this.endDate == 'Present' ? new Date() : new Date(this.endDate);
      console.log(start);
      let duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      let years = Math.floor(duration / 365.25);
      let months = Math.floor((duration - years * 365.25) / 30.4375);

      let duration_str = '';
      if (years > 1) {
        duration_str = duration_str.concat(`${years} years `);
      } else if (years > 0) {
        duration_str = duration_str.concat(`${years} year `);
      }
      if (months > 1) {
        duration_str = duration_str.concat(`${months} months `);
      } else if (months > 0) {
        duration_str = duration_str.concat(`${months} month `);
      }

      return duration_str;
    },

    startDateFormat() {
      let start = new Date(this.startDate);
      return start.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
      });
    },

    endDateFormat() {
      if (this.endDate == 'Present') {
        return 'Present';
      } else {
        let end = new Date(this.endDate);
        return end.toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .headerText {
    display: inline-block;
    padding-left: 8px;
  }

  h1 {
    font-size: 16px;
    font-weight: 700;
    color: $text-color;
    margin-bottom: 0;
  }

  .location {
    color: $text-grey;
    &:before {
      content: ' | ';
    }
  }

  .logo {
    display: inline-block;

    img {
      width: 40px;
      height: 40px;
    }
  }
}

.slot {
  margin-left: 48px;

  .item:not(:last-child):before {
    content: '';
    position: absolute;
    left: -22px;
    top: 25px;
    height: calc(100% - 9px);
    width: 2px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .item:only-child {
    .path-node {
      display: none !important;
    }
  }

  .item {
    margin-bottom: 20px;
  }
}

@media (max-width: 992px) {
  .slot {
    margin-left: 28px;
  }
}
</style>
