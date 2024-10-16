<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
</script>

<template>
  <Carousel
    class="relative w-full overflow-hidden"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
        class="md:basis-1/2 lg:basis-1/3"
      >
        <div class="p-1">
          <Card class="border-none shadow-none">
            <CardContent
              class="flex flex-col gap-[10px] aspect-square items-center justify-center p-0"
            >
              <div class="w-full h-[306px] bg-gray-300 animate-pulse"/>
              <div class="w-full mt-2 flex flex-col gap-[10px]">
                <div class="h-[18px] w-full rounded-full font-bold bg-gray-300 animate-pulse"/>
                <div class="h-[18px] w-1/2 rounded-full font-bold bg-gray-300 animate-pulse"/>
              </div>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
