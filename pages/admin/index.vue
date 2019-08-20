<template>
  <div>
    <h1>Posts analytics</h1>
    <app-analytics-chart
      title="Number of views"
      :labels="views.labels"
      :data="views.data"
    />
    <app-analytics-chart
      title="Number of comments"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>
<script>
import AppAnalyticsChart from '@/components/admin/analyticChart'
export default {
  head: {
    title: 'Analytics'
  },
  layout: 'admin',
  middleware: ['auth'],
  components: {
    AppAnalyticsChart
  },
  async asyncData ({ store }) {
    const { views, comments } = await store.dispatch('posts/getAnalytics')
    return { views, comments }
  }
}
</script>
