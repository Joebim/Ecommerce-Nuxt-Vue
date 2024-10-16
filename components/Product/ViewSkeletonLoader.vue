<script setup lang="ts">
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { watchOnce, useWindowSize } from "@vueuse/core";

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});

const api = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(0);

watchOnce(api, (api) => {
  if (!api) return;

  totalCount.value = api.scrollSnapList().length;
  current.value = api.selectedScrollSnap() + 1;

  api.on("select", () => {
    current.value = api.selectedScrollSnap() + 1;
  });
});

const { width } = useWindowSize();
</script>

<template>
  <div
    class="flex flex-col gap-[80px] pt-[20px] sm:pt-0 px-[20px] mb-[70px] sm:px-[60px] bg-white"
  >
    <div
      class="relative bg-white p-[5px] px-0 sm:px-[80px] flex flex-col gap-[20px]"
    >
      <div class="h-[20px] rounded-[5px] w-[80%] bg-gray-300 animate-pulse" />

      <div class="w-full flex flex-col lg:flex-row sm:gap-[20px]">
        <template v-if="width > 1024">
          <div class="flex-[1] w-full flex flex-row gap-[10px]">
            <Carousel
              orientation="vertical"
              class="relative flex-[1] max-w-[50px] hidden sm:block"
              @init-api="(val) => (emblaThumbnailApi = val)"
            >
              <CarouselContent class="flex gap-1 ml-0 mt-0">
                <CarouselItem
                  v-for="(_, index) in 4"
                  :key="index"
                  class="pl-0 basis-1/4 cursor-pointer pt-0"
                  @click="onThumbClick(index)"
                >
                  <div
                    class="p-1"
                    :class="index === selectedIndex ? '' : 'opacity-50'"
                  >
                    <Card>
                      <CardContent
                        class="flex aspect-square flex-row justify-center items-center h-[40px] p-0 bg-gray-300 animate-pulse"
                      />
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            <Carousel
              class="relative flex-[5] flex-grow max-w-full md:max-w-[25rem]"
              @init-api="(val) => (emblaMainApi = val)"
            >
              <CarouselContent>
                <CarouselItem v-for="(_, index) in 10" :key="index">
                  <div class="p-1">
                    <Card class="border-none shadow-none">
                      <CardContent
                        class="flex aspect-square flex-row justify-center items-center h-[400px] p-0 bg-gray-300 animate-pulse"
                      />
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </template>
        <template v-else>
          <div class="w-full h-[200px] sm:w-auto bg-gray-300 animate-pulse"/>
        </template>

        <div class="flex-[1] relative flex flex-col gap-[15px] pt-[20px] px-0 sm:px-[20px] sm:py-[20px]">
          <div
            class="h-[20px] rounded-[5px] w-[80%] bg-gray-300 animate-pulse"
          />
          <div
            class="h-[20px] rounded-[5px] flex flex-row gap-[10px] items-center bg-gray-300 animate-pulse"
          />
          <div class="flex flex-row items-center gap-[10px]">
            <div
              class="h-[20px] w-[100px] bg-gray-300 animate-pulse rounded-[5px]"
            />
            <div
              class="h-[20px] w-[100px] bg-gray-300 animate-pulse rounded-[5px]"
            />
          </div>

          <div class="h-[40px] bg-gray-300 animate-pulse rounded-[5px]" />

          <div class="flex flex-col mt-[30px] gap-[5px] text-gray-500">
            <div
              class="h-[20px] w-[100px] bg-gray-300 animate-pulse rounded-[5px]"
            />

            <div
              class="h-[20px] rounded-[5px] w-[80%] bg-gray-300 animate-pulse"
            />
            <div
              class="h-[20px] rounded-[5px] flex flex-row gap-[10px] items-center bg-gray-300 animate-pulse"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
