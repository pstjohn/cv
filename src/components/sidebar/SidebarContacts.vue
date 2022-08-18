<template>
  <div class="contact-container container-block">
    <ul class="list-unstyled contact-list">
      <li class="email">
        <font-awesome-icon icon="fa-solid fa-envelope" />
        <img class="obscured" src="@/assets/images/email.svg" />
      </li>
      <li class="phone">
        <font-awesome-icon icon="fa-solid fa-phone" />
        <img class="obscured" src="@/assets/images/phone.svg" />
      </li>
      <li>
        <font-awesome-icon icon="fa-solid fa-earth-americas" /><a
          href="https://www.pcstj.com"
          >pcstj.com</a
        >
      </li>
      <li>
        <font-awesome-icon icon="fa-brands fa-linkedin-in" /><a
          href="https://www.linkedin.com/in/peterstjohn/"
          >peterstjohn</a
        >
      </li>
      <li>
        <font-awesome-icon icon="fa-brands fa-github" /><a
          href="https://github.com/pstjohn/"
          >pstjohn
        </a>
        <span class="followers-wrap">
          <font-awesome-icon icon="fa-solid fa-user-group" size="xs" />
          <span class="num-followers" v-if="ready" v-text="githubFollowers" />
          <font-awesome-icon
            v-else
            spin
            icon="fa-solid fa-rotate"
            class="num-followers"
          />
        </span>
      </li>
      <li>
        <img
          class="fa-svg"
          src="@/assets/images/google-scholar.svg"
          alt="google scholar"
        /><a href="https://scholar.google.com/citations?user=NdWzcVMAAAAJ"
          >Google Scholar</a
        >
      </li>
      <li>
        <font-awesome-icon icon="fa-brands fa-orcid" /><a
          href="https://orcid.org/0000-0002-7928-3722"
          >0000-0002-7928-3722</a
        >
      </li>
      <li>
        <img class="fa-svg" src="@/assets/images/publons.svg" alt="publons" /><a
          href="https://publons.com/wos-op/researcher/4486958/peter-st-john/"
          >AAQ-1508-2021</a
        >
      </li>
      <li>
        <font-awesome-icon icon="fa-brands fa-stack-overflow" /><a
          href="https://stackoverflow.com/users/1154946/pstjohn"
          >pstjohn</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarContacts',
  data() {
    return {
      email: 'TODO',
      githubFollowers: null,
      ready: false,
    };
  },
  async created() {
    const response = await fetch('https://api.github.com/users/pstjohn');
    let data = await response.json();
    this.githubFollowers = data['followers'];
    this.ready = true;
  },
};
</script>

<style lang="scss">
.fa-svg {
  width: 16px;
  margin-right: 5px;
  vertical-align: middle;
}

img.obscured {
  height: 15px;
}

.contact-list {
  padding: 0;
  list-style-type: none;
  font-size: 16px;

  .svg-inline--fa {
    margin-right: 5px;
    vertical-align: middle;
  }

  li {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .followers-wrap {
    font-size: 14px;
    color: $text-grey;

    &:before {
      content: ' (';
    }
    &:after {
      content: ' followers)';
    }
  }
}
</style>
