<template>
  <div class="sidebar-wrapper">
    <div class="profile-container">
      <img class="profile" data-src="holder.js/220x220" alt="" />
      <h1 class="name">Peter St. John<span class="phd">, PhD</span></h1>
      <div class="pronouns">(he/him/his)</div>

      <h3 class="tagline">
        Principal Investigator & Senior Scientist at the National Renewable
        Energy Lab
      </h3>
    </div>

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

    <SidebarSection title="Software">
      <GithubRepo name="pstjohn/d3flux" />
      <GithubRepo name="NREL/nfp" />
      <GithubRepo name="NREL/alfabet" />
      <GithubRepo name="pstjohn/bde" />
      <GithubRepo name="NREL/rlmolecule" />
      <GithubRepo name="NREL/graph-env" />
      <GithubRepo name="opencobra/cobrapy" />
    </SidebarSection>
  </div>
</template>

<script>
import SidebarSection from './sidebar/SidebarSection.vue';
import SidebarContacts from './sidebar/SidebarContacts.vue';
import EducationEntry from './sidebar/EducationEntry.vue';
import SidebarStats from './sidebar/SidebarStats.vue';
import GithubRepo from './GithubRepo.vue';
export default {
  name: 'SidebarWrapper',
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
  color: $lighter-grey;
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
    min-height: 800px;
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
</style>
