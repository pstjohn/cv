<template>
  <div class="sidebar-wrapper">
    <div class="profile-container">
      <img
        class="profile"
        :src="require('@/assets/images/profile_photo.jpg')"
        alt=""
      />
      <h1 class="name">Peter St. John<span class="phd">, PhD</span></h1>

      <h3 class="tagline">
        {{ profile.tagline }}
      </h3>
    </div>

    <div id="singlePageToggle" class="d-print-none"></div>

    <SidebarStats />
    <SidebarContacts :compact="singlePage" />

    <SidebarSection title="Skills" class="skills-section">
      <p v-for="skill in profile.skills" :key="skill.label">
        <strong>{{ skill.label }}</strong><br />{{ skill.text }}
      </p>
    </SidebarSection>

    <SidebarSection title="Education">
      <EducationEntry
        degree="PhD in Chemical Engineering"
        location="University of California Santa Barbara"
        time="2010-2015"
      >
        <div v-if="!singlePage"><span class="edu-tag">Advisor:</span> Francis J. Doyle III</div>
        <div v-if="!singlePage">
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

  </div>
</template>

<script>
import SidebarSection from './sidebar/SidebarSection.vue';
import SidebarContacts from './sidebar/SidebarContacts.vue';
import EducationEntry from './sidebar/EducationEntry.vue';
import SidebarStats from './sidebar/SidebarStats.vue';
import profile from '@/assets/profile.json';

export default {
  name: 'SidebarWrapper',
  props: ['singlePage'],
  data() {
    return { profile };
  },
  components: {
    SidebarSection,
    SidebarContacts,
    EducationEntry,
    SidebarStats,
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


  }
}
.edu-tag {
  font-weight: 500;
}

.skills-section {
  font-size: 13px;
  line-height: 1.4;

  p { margin-bottom: 10px; }
  p:last-child { margin-bottom: 0; }
  strong { font-weight: 600; }
}

@media print {
  .skills-section { font-size: 11px; }
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
