<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useHead } from "#app";

useHead({
  title: 'Ecommerce App',
      meta: [
        { name: 'description', content: 'Your one-stop shop for all your ecommerce needs.' },
        { name: 'keywords', content: 'ecommerce, shop, online store, buy, sell' },
        { name: 'author', content: 'Your Name' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Ecommerce App' },
        { property: 'og:description', content: 'Your one-stop shop for all your ecommerce needs.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://your-ecommerce-app.com' },
        { property: 'og:image', content: 'https://your-ecommerce-app.com/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ecommerce App' },
        { name: 'twitter:description', content: 'Your one-stop shop for all your ecommerce needs.' },
        { name: 'twitter:image', content: 'https://your-ecommerce-app.com/twitter-image.jpg' },
      ],
      link: [
        { rel: 'canonical', href: 'https://your-ecommerce-app.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </div>
</template>
