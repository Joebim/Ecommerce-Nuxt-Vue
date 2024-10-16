<script setup lang="ts">
import { defineProps } from "vue";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { usePrice } from "../../composables/usePrice";
import { useWindowSize } from "@vueuse/core";

const props = defineProps<{
  products:
    | {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        rating: { rate: number; count: number };
      }[]
    | null;
  loading: boolean;
}>();

const { width } = useWindowSize();
</script>

<template>
  <div v-if="loading">
    <ProductSkeletonLoader />
  </div>
  <div v-else>
    <Carousel
      v-if="width > 640"
      can-scroll-prev="false"
      can-scroll-next="false"
      class="relative w-full"
      :opts="{ align: 'start' }"
    >
      <CarouselContent>
        <CarouselItem
          v-for="product in props.products"
          :key="product.id"
          class="md:basis-1/2 lg:basis-1/3"
        >
          <NuxtLink
            :to="{
              name: 'products-id',
              params: {
                id: product.id,
              },
            }"
          >
            <Card class="border-none shadow-none cursor-pointer hover:bg-gray-100 duration-300">
              <CardContent class="flex flex-col gap-[10px] aspect-square items-center justify-center py-6 px-2 sm:px-6">
                <div class="w-full h-[306px]">
                  <img
                    :src="product.image"
                    :alt="product.title"
                    class="w-full h-full object-cover"
                  >
                </div>
                <div class="w-full mt-2">
                  <h4 class="text-[18px] font-bold">{{ product.title }}</h4>
                  <p class="text-[16px]">{{ usePrice(product.price) }}</p>
                </div>
              </CardContent>
            </Card>
          </NuxtLink>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <div v-else class="flex flex-col gap-[10px]">
      <div
        v-for="product in props?.products?.slice(0, 3)"
        :key="product.id"
        class="flex flex-col gap-[10px]"
      >
        <NuxtLink
          :to="{
            name: 'products-id',
            params: {
              id: product.id,
            },
          }"
        >
          <Card class="border-none shadow-none cursor-pointer hover:bg-gray-100 duration-300">
            <CardContent class="flex flex-col gap-[10px] aspect-square items-center justify-center py-6 px-2 sm:px-6">
              <div class="w-full h-[306px]">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="w-full mt-2">
                <h4 class="text-[18px] font-bold">{{ product.title }}</h4>
                <p class="text-[16px]">{{ usePrice(product.price) }}</p>
              </div>
            </CardContent>
          </Card>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
