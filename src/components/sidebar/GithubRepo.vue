<template>
  <div class="github-component">
    <font-awesome-icon icon="fa-brands fa-github" />
    <a :href="html_url">
      <span class="repo-name"> {{ name }} </span>
    </a>

    <span class="num-stars" v-if="ready" v-text="data.stargazers_count" />
    <font-awesome-icon
      v-else
      spin
      icon="fa-solid fa-rotate"
      class="num-stars"
    />
    <font-awesome-icon icon="fa-regular fa-star" />

    <span class="num-forks" v-if="ready" v-text="data.forks_count" />
    <font-awesome-icon
      v-else
      spin
      icon="fa-solid fa-rotate"
      class="num-forks"
    />
    <font-awesome-icon icon="fa-solid fa-code-fork" />

    <div class="badge" v-if="pypi !== 'false'">
      <a :href="badge_url"
        ><img :src="badge_svg" alt="PyPI version" height="18"
      /></a>
    </div>

    <div class="description">
      {{ data.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GithubRepo',
  props: {
    name: String,
    pypi: {
      type: String,
      default: 'false',
    },
  },
  data() {
    return {
      data: {
        description: null,
        stargazers_count: null,
        forks_count: null,
      },
      ready: false,
    };
  },
  async created() {
    const response = await fetch(`https://api.github.com/repos/${this.name}`);
    this.data = await response.json();
    if (this.data.message == 'Not Found') {
      this.ready = false;
    } else {
      this.ready = true;
    }
  },
  computed: {
    html_url() {
      return `https://github.com/${this.name}`;
    },
    badge_url() {
      return `https://badge.fury.io/py/${this.pypi}`;
    },
    badge_svg() {
      return `https://badge.fury.io/py/${this.pypi}.svg`;
    },
  },
};
</script>

<style lang="scss">
.github-component {
  font-size: 14px;
  font-weight: 600;
  break-inside: avoid;
  margin-bottom: 5px;

  .badge {
    margin-left: 1rem;
    padding: 0;
    display: block;
    text-align: left;
  }

  a {
    text-decoration: none;
  }

  .repo-name {
    margin-left: 0.2rem;
  }

  .num-forks,
  .num-stars {
    margin-left: 0.5rem;
  }

  .description {
    font-weight: 400;
    font-size: 13px;
    margin-left: 1rem;
    color: $text-grey;
  }
}
</style>
