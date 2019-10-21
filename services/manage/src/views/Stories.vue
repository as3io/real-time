<template>
  <div class="stories">
    <h1>Stories</h1>
    <div v-if="isLoading">Loading stories...</div>
    <div v-else-if="error">
      {{ error.message }}
      <a href="#retry-operation" @click.prevent="retryQuery">Retry?</a>
    </div>
    <ul v-else>
      <li
        v-for="(story) in stories"
        :key="story.id"
      >
        <router-link :to="{ name: 'story', params: { id: story.id }}">
          {{ story.title }}
        </router-link>
        <small>{{ story.id }}</small>
      </li>
    </ul>
  </div>
</template>


<script>
import gql from 'graphql-tag';

const query = gql`

query ListStories {
  stories(input: { limit: 100, sort: { field: title } }) {
    id
    title
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
      this.$apollo.queries.stories.refresh();
    },
  },

  /**
   *
   */
  apollo: {
    stories: {
      query,
      fetchPolicy: 'cache-and-network',
      error(e) {
        this.error = e;
      },
      subscribeToMore: {
        document: gql`
          subscription StoryCreated {
            storyCreated {
              id
              title
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData }) => {
          const { stories } = previousResult;
          const { storyCreated } = subscriptionData.data;
          if (stories.find(story => story.id === storyCreated.id)) {
            return previousResult;
          }

          console.log('Adding story', storyCreated.id);
          return {
            stories: [...stories, storyCreated],
          };
        },
      },
    },
    $subscribe: {
      deleteStory: {
        query: gql`
          subscription StoryDeleted {
            storyDeleted
          }
        `,
        result({ data }) {
          const { storyDeleted: id } = data;
          console.log('Story deleted', id);
          this.stories = this.stories.filter(story => story.id !== id);
        },
      },
    },
  },
};
</script>
