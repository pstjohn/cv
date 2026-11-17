<template>
  <div class="contact-container container-block">
    <ul class="list-unstyled contact-list">
      <li class="email">
        <font-awesome-icon icon="fa-solid fa-envelope" />
        <a class="email-address" href="mailto:inquiries@agents.pcstj.com">inquiries@agents.pcstj.com</a>
      </li>
      <li class="phone">
        <font-awesome-icon icon="fa-solid fa-phone" />
        <img class="obscured" src="@/assets/images/phone.svg" />
      </li>
      <li>
        <font-awesome-icon icon="fa-solid fa-location-dot" />
        Golden, CO
      </li>
      <li>
        <font-awesome-icon icon="fa-solid fa-earth-americas" /><a
          href="https://www.pcstj.com/cv"
          >pcstj.com/cv</a
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
        <span class="followers-wrap" v-if="!compact && githubFollowers !== null">
          <font-awesome-icon icon="fa-solid fa-user-group" size="xs" />
          <span class="num-followers" :title="statsTitle" v-text="githubFollowers" />
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
      <li v-if="!compact">
        <font-awesome-icon icon="fa-brands fa-orcid" /><a
          href="https://orcid.org/0000-0002-7928-3722"
          >0000-0002-7928-3722</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import githubUser from '@/assets/github-user.json';

export default {
  name: 'SidebarContacts',
  props: { compact: Boolean },
  data() {
    return {
      githubFollowers: githubUser.followers,
      statsTitle: `GitHub count saved ${githubUser.updatedAt}`,
    };
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
  .email-address {
    font-size: 0.875em;
    white-space: nowrap;
  }

  a {
    text-decoration: none;
  }

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
