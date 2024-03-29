<template>
  <div class="sidebar-wrapper">
    <div class="profile-container">
      <img
        class="profile"
        :src="require('@/assets/images/profile_photo.jpg')"
        alt=""
      />
      <h1 class="name">Peter St. John<span class="phd">, PhD</span></h1>
      <div class="pronouns">(he/him/his)</div>

      <h3 class="tagline">
        Machine Learning Engineer at NVIDIA
      </h3>
    </div>

    <div id="singlePageToggle" class="d-print-none"></div>

    <SidebarStats />
    <SidebarContacts />

    <SidebarSection title="Education">
      <EducationEntry
        degree="PhD in Chemical Engineering"
        location="University of California Santa Barbara"
        time="2010-2015"
      >
        <div><span class="edu-tag">Advisor:</span> Francis J. Doyle III</div>
        <div>
          <span class="edu-tag">Thesis:</span> Mathematical approaches to
          understanding mammalian circadian rhythms
          <a href="https://escholarship.org/uc/item/6nh6t2tr">[link]</a>
        </div>
      </EducationEntry>
      <EducationEntry
        degree="BSc in Chemical Engineering"
        location="Tufts University"
        time="2006-2010"
      />
    </SidebarSection>

    <div :class="{ 'd-none': singlePage }">
      <SidebarSection title="Software">
        <GithubRepo name="pstjohn/d3flux" pypi="d3flux" />
        <GithubRepo name="NREL/nfp" pypi="nfp" />
        <GithubRepo name="NREL/alfabet" pypi="alfabet" />
        <!-- <GithubRepo name="pstjohn/bde" /> -->
        <GithubRepo name="NREL/rlmolecule" pypi="rlmolecule" />
        <GithubRepo name="NREL/graph-env" pypi="graphenv" />
        <GithubRepo name="opencobra/cobrapy" pypi="cobra" />
      </SidebarSection>
    </div>
  </div>
</template>

<script>
import SidebarSection from './sidebar/SidebarSection.vue';
import SidebarContacts from './sidebar/SidebarContacts.vue';
import EducationEntry from './sidebar/EducationEntry.vue';
import SidebarStats from './sidebar/SidebarStats.vue';
import GithubRepo from './sidebar/GithubRepo.vue';

export default {
  name: 'SidebarWrapper',
  props: ['singlePage'],
  components: {
    SidebarSection,
    SidebarContacts,
    EducationEntry,
    SidebarStats,
    GithubRepo,
  },
};
</script>

<style lang="scss">
.phd {
  color: $text-grey;
}

@media (max-width: 767.98px) {
  .sidebar-wrapper {
    position: static;
    width: inherit;
  }
}

@media print, (min-width: 768px) {
  .sidebar-wrapper {
    position: absolute;
    width: 280px;
    height: 100%;
  }
}

.sidebar-wrapper {
  border-right: 1.5px solid;
  border-color: $lighter-grey;
  left: 0;
  color: $text-color;

  a {
    color: $text-color;
  }

  .profile-container {
    padding: 0px 30px 15px 30px;

    // background: rgba(0, 0, 0, 0.2);
    text-align: center;
    color: $text-color;

    .name {
      font-size: 22px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 0;
    }

    .tagline {
      color: $text-color-secondary;
      font-size: 15.5px;
      font-weight: 400;
      margin-top: 0;
      margin-bottom: 0;
      text-align: left;
    }

    .profile {
      max-width: 200px;
      max-height: 200px;
      border-radius: 50%;
      margin-bottom: 15px;
    }

    .pronouns {
      text-align: center;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 300;
      font-family: 'Roboto';
      color: $text-grey;
    }
  }
}
.edu-tag {
  font-weight: 500;
}

#singlePageToggle {
  width: 100%;
  text-align: center;
}

singlePage-software {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 660px;
}
</style>
