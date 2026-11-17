<template>
  <div v-if="selectedAssets.length || upcoming.length" class="public-assets"
    :class="{ 'single-asset': selectedAssets.length + upcoming.length === 1 }" aria-label="Related NVIDIA work">
    <article v-for="asset in selectedAssets" :key="asset.id" class="public-asset" :class="{ 'repository-asset': asset.repository }">
      <div v-if="!asset.repository" class="asset-label">Technical blog<span v-if="asset.contribution"> · {{ asset.contribution }}</span></div>
      <GithubRepo v-if="asset.repository" :name="asset.repository" />
      <template v-else>
        <a class="asset-title" :href="asset.url">{{ asset.title }}</a>
        <p v-if="!compact">{{ asset.summary }}</p>
      </template>
    </article>
    <article v-for="asset in upcoming" :key="asset.id" class="public-asset upcoming-asset">
      <div class="asset-label">{{ asset.label }}</div>
      <span class="asset-title">{{ asset.title }}</span>
    </article>
  </div>
</template>

<script>
import assets from '@/assets/public-assets.json';
import GithubRepo from './sidebar/GithubRepo.vue';

export default {
  name: 'PublicAssets',
  components: { GithubRepo },
  props: {
    compact: Boolean,
    assetIds: { type: Array, default: () => [] },
    upcoming: { type: Array, default: () => [] },
  },
  computed: {
    selectedAssets() {
      const destination = this.compact ? 'resume' : 'cv';
      return assets.filter(asset => this.assetIds.includes(asset.id) && asset.outputs.includes(destination));
    },
  },
};
</script>

<style lang="scss">
.public-assets {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 8px 0 12px;
}

.public-asset {
  padding: 12px;
  border: 1px solid #dce2e7;
  border-radius: 5px;
  background: #f7f9fa;
  break-inside: avoid;
  min-width: 0;

  p { margin: 6px 0 0; color: $text-grey; }
  .github-component { margin: 0; }
  .repo-name { overflow-wrap: anywhere; }
}

.asset-label {
  color: $text-grey;
  font-size: 11px;
  margin-bottom: 5px;
}

.asset-title { font-weight: 600; text-decoration: none; }
.public-assets.single-asset { grid-template-columns: 1fr; }
.upcoming-asset { border-style: dashed; }
.public-asset.repository-asset {
  grid-column: 1 / -1;
  padding: 0;
  border: 0;
  background: transparent;
}

@media screen and (max-width: 575px) {
  .public-assets { grid-template-columns: 1fr; }
}

@media print {
  .public-assets { gap: 7px; margin: 8px 0 10px; }
  .public-asset { padding: 8px; }
  .asset-label { font-size: 10px; margin-bottom: 3px; }
}
</style>
