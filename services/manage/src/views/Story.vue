<template>
  <div class="story">
    <div v-if="isLoading" class="story__loading">
      Loading story...
    </div>
    <div v-else-if="error" class="story__error">
      {{ error.message }}
    </div>
    <div v-else class="story__details">
      <small>ID: {{ story.id }}</small>
      <h3>{{ story.title }}</h3>
      <div v-html="story.body" />
    </div>
  </div>
</template>


<script>
import gql from 'graphql-tag';

const query = gql`

query ViewStory($input: QueryStoryInput!) {
  story(input: $input) {
    id
    title
    body
  }
}

`;

export default {
  /**
   *
   */
  data: () => ({
    error: null,
  }),

  /**
   *
   */
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
  },

  /**
   *
   */
  methods: {
    retryQuery() {
      this.error = null;
      this.$apollo.queries.story.refresh();
    },
  },

  /**
   *
   */
  apollo: {
    story: {
      query,
      fetchPolicy: 'cache-and-network',
      variables() {
        const { id } = this.$route.params;
        const input = { id };
        return { input };
      },
      error(e) {
        this.error = e;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .story {
    margin-top: 1rem;
  }
</style>
