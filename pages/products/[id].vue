<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Product } from "~/types";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { watchOnce, useWindowSize } from "@vueuse/core";
import { ShoppingCart } from "lucide-vue-next";
import { usePrice } from "~/composables/usePrice";
import { useCartStore } from "~/stores/cart";
import { useFetch } from "~/hooks/useFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import { useShortenText } from "~/composables/useShortenText";

const { toast } = useToast();

const route = useRoute();

const { data: product, loading: productLoading } = useFetch<Product>(
  `https://fakestoreapi.com/products/${route.params.id}`
);

const { data: products, loading: productsLoading } = useFetch<Product[]>(
  `https://fakestoreapi.com/products`
);

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

function setApi(val: CarouselApi) {
  api.value = val;
}

watchOnce(api, (api) => {
  if (!api) return;

  totalCount.value = api.scrollSnapList().length;
  current.value = api.selectedScrollSnap() + 1;

  api.on("select", () => {
    current.value = api.selectedScrollSnap() + 1;
  });
});

const cartStore = useCartStore();

const { width } = useWindowSize();

const { shortenText }= useShortenText()
</script>

<template>
  <div
    class="flex flex-col gap-[80px] pt-[20px] sm:pt-0 px-[20px] mb-[70px] sm:px-[80px] bg-white"
  >
    <template v-if="productLoading">
      <ProductViewSkeletonLoader />
    </template>
    <template v-else>
      <div
        class="relative bg-white p-[5px] px-0 sm:px-[80px] flex flex-col gap-[20px]"
      >
        <div
          class="flex flex-row gap-[1px] sm:gap-[5px] font-degular font-light text-[#787879] text-[14px] sm:text-[16px]"
        >
          <NuxtLink
            to="/"
            class="hover:text-black cursor-pointer font-rustica"
            >Home</NuxtLink
          >
          /
          <span
            class="hover:text-black cursor-pointer font-rustica"
            >{{ product?.category }}</span
          >
          /
          <span class="hidden md:block text-primary font-rustica">{{
            product?.title
          }}</span>
          <span class="block md:hidden text-primary font-rustica">{{
            shortenText(product?.title ?? "", width < 768 ? 20 : width > 1024 ? 15 : 10)
          }}</span>
        </div>
        <div class="w-full flex flex-col lg:flex-row sm:gap-[20px]">
          <template v-if="width > 1024">
            <div class="flex-[1] w-full flex flex-row gap-[10px]">
              <Carousel
                orientation="vertical"
                class="relative flex-[1] max-w-[50px]"
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
                          class="flex aspect-square flex-row justify-center items-center h-[40px] p-0"
                        >
                          <img
                            :src="product?.image"
                            :alt="product?.title"
                            class="w-full h-full object-cover"
                          >
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              <Carousel
                class="relative flex-[5] flex-grow max-w-[25rem]"
                @init-api="(val) => (emblaMainApi = val)"
              >
                <CarouselContent>
                  <CarouselItem v-for="(_, index) in 10" :key="index">
                    <div class="p-1">
                      <Card class="border-none shadow-none">
                        <CardContent
                          class="flex aspect-square items-center justify-center p-0 h-[400px]"
                        >
                          <img
                            :src="product?.image"
                            :alt="product?.title"
                            class="w-full h-full object-cover"
                          >
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </template>
          <template v-else>
            <div class="w-full sm:w-auto">
              <Carousel class="relative w-full max-w-full" @init-api="setApi">
                <div
                  class="absolute w-full bottom-0 z-[200] py-8 flex justify-center"
                >
                  <div class="flex flex-row gap-[5px]">
                    <div v-for="(_, index) in totalCount" :key="index" class="">
                      <div
                        class="h-[10px] w-[10px] rounded-full"
                        :class="{
                          'bg-gray-400': index + 1 === current,
                          'bg-gray-100': index + 1 !== current,
                        }"
                      />
                    </div>
                  </div>
                </div>

                <CarouselContent>
                  <CarouselItem v-for="(_, index) in 5" :key="index">
                    <div class="p-1">
                      <Card class="border-none shadow-none">
                        <CardContent
                          class="flex aspect-square items-center justify-center p-0"
                        >
                          <img
                            :src="product?.image"
                            :alt="product?.title"
                            class="w-full h-full object-cover"
                          >
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </template>

          <div class="flex-[1] relative flex flex-col gap-[15px] p-[20px]">
            <div class="w-[80%]">
              <p class="text-[24px] font-bold">{{ product?.title }}</p>
            </div>
            <div class="flex flex-row gap-[10px] items-center">
              <p class="text-[20px] text-primary">
                {{ usePrice(product?.price) }}
              </p>
              <p class="text-[16px] text-gray-400 line-through">
                {{ usePrice(product?.price) }}
              </p>
              <div
                class="py-[3px] px-[8px] bg-primary-light text-primary rounded-[3px] text-[12px]"
              >
                7 Left
              </div>
            </div>
            <div class="flex flex-row items-center gap-[10px]">
              <ProductRating :rating="product?.rating?.rate" />
              <p class="text-[13px] text-primary">
                ({{ product?.rating?.count }} ratings)
              </p>
            </div>
            <Button
              class="bg-primary text-white flex flex-row gap-[10px] items-center text-[15px] font-rustica font-extralight hover:bg-primary-hover"
              @click="
                () => {
                  if (
                    product?.id !== undefined &&
                    product?.title &&
                    product?.price !== undefined &&
                    product?.image
                  ) {
                    cartStore.addToCart({
                      id: product.id,
                      name: product.title,
                      price: product.price,
                      image: product.image,
                    });
                    toast({
                      description: 'Product added to cart',
                    });
                  }
                }
              "
            >
              <ShoppingCart class="w-[16px]" />
              <p class="mt-[6px]">Add to Cart</p>
            </Button>

            <div class="flex flex-col gap-[5px] text-gray-500">
              <h4 class="text-[12px] font-degular font-bold">
                PRODUCT DETAILS
              </h4>
              <p class="text-[16px] font-rustica font-extralight">
                {{ product?.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="flex flex-col gap-[20px]">
      <div class="flex flex-row gap-[5px] items-center">
        <div class="bg-primary h-[30px] w-[3px]" />
        <p class="text-[20px] font-rustica">More items to explore</p>
      </div>
      <ProductSlider :products="products" :loading="productsLoading" />
    </div>
  </div>
</template>
