<script setup lang="ts">
import { computed } from 'vue';
import { useFetch } from '~/hooks/useFetch';
import { Button } from "@/components/ui/button";
import homeImage from "~/assets/images/home-image.png";
import type { Product } from '~/types';

const { data: products, loading } = useFetch<Product[]>(`https://fakestoreapi.com/products`);

const backgroundImageStyle = computed(() => ({
  backgroundImage: `url(${homeImage})`,
}));
</script>

<template>
  <div class="bg-white p-0 sm:p-[60px] pt-[20px] flex flex-col gap-[70px]">
    <header
      class="h-[500px] sm:h-[100vh] pt-[30px] sm:pt-[70px] px-[15px] sm:px-[90px] flex justify-center sm:bg-cover bg-center sm:bg-no-repeat"
      :style="backgroundImageStyle"
      role="banner"
    >
      <div class="flex flex-col gap-[20px] sm:w-full w-[60%]">
        <h1 class="text-black text-[32px] font-bold text-center">
          New Arrival In Computing
        </h1>
        <Button title="Shop Now" class="self-center bg-primary hover:bg-primary-hover" aria-label="Shop Now">
          Shop Now
        </Button>
      </div>
    </header>

    <main class="px-[20px] md:px-0 lg:px-[60px] flex flex-col gap-[30px]" role="main">
      <section aria-labelledby="best-sellers-section">
        <header class="flex flex-row gap-[5px] items-center">
          <div class="bg-primary h-[30px] w-[3px]" />
          <h2 id="best-sellers-section" class="text-[20px] font-rustica">Best sellers</h2>
        </header>
        <ProductSlider :products="products" :loading="loading" aria-label="Best sellers" />
      </section>

      <section aria-labelledby="new-arrivals-section">
        <header class="flex flex-row gap-[5px] items-center">
          <div class="bg-primary h-[30px] w-[3px]" />
          <h2 id="new-arrivals-section" class="text-[20px] font-rustica">New Arrivals</h2>
        </header>
        <ProductSlider :products="products" :loading="loading" aria-label="New Arrivals" />
      </section>

      <section aria-labelledby="top-picks-section">
        <header class="flex flex-row gap-[5px] items-center">
          <div class="bg-primary h-[30px] w-[3px]" />
          <h2 id="top-picks-section" class="text-[20px] font-rustica">Top picks</h2>
        </header>
        <ProductSlider :products="products" :loading="loading" aria-label="Top picks" />
      </section>
    </main>
  </div>
</template>
