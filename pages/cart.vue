<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetch } from "~/hooks/useFetch";
import type { Product } from "~/types";
import { useCartStore } from "#imports";
import { Button } from "~/components/ui/button";
import { NuxtLink } from "#components";
import { usePrice } from "~/composables/usePrice";

const cartStore = useCartStore();
const { data: products, loading: productsLoading } = useFetch<Product[]>(
  `https://fakestoreapi.com/products`
);

const isHydrated = ref(false);

onMounted(() => {
  isHydrated.value = true;
});
</script>

<template>
  <div class="flex flex-col gap-[80px] px-0 md:px-[80px] py-[30px]">
    <div class="px-[20px] sm:px-[80px] bg-white">
      <div class="">
        <template v-if="!isHydrated">
          <div class="flex justify-center items-center h-[300px]">
            <p>Loading...</p>
          </div>
        </template>

        <template v-else-if="cartStore.cart.length === 0">
          <div class="flex justify-center items-center h-[300px]">
            <div class="flex flex-col items-center gap-[10px]">
              <p>Your cart is empty. Start shopping for furniture!</p>
              <NuxtLink to="/">
                <Button title="Start Shopping" class="self-center bg-primary hover:bg-primary-hover" aria-label="Start Shopping">
          Start Shopping
        </Button>
              </NuxtLink>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="flex flex-col gap-[40px]">
            <p class="text-[20px] font-rustica font-light">Shopping Cart</p>
            <div
              class="relative bg-white p-[5px] flex flex-col md:flex-col lg:flex-row sm:gap-[100px]"
            >
              <div class="flex-[7] flex flex-col gap-[20px]">
                <div
                  v-for="cartItem in cartStore.cart"
                  :key="cartItem.id"
                  class="flex flex-col gap-[20px] sm:gap-[20px]"
                >
                  <div class="flex flex-col sm:flex-row justify-between gap-[10px] sm:gap-0">
                    <div class="flex flex-row gap-[20px]">
                      <NuxtLink
                        :to="{
                          name: 'products-id',
                          params: {
                            id: cartItem.id,
                          },
                        }"
                      >
                        <div class="h-[120px] w-[110px]">
                          <img
                            :src="cartItem.image"
                            :alt="cartItem.name"
                            class="w-full h-full object-cover"
                          >
                        </div>
                      </NuxtLink>

                      <div class="flex flex-col justify-between">
                        <div class="flex flex-col gap-[5px]">
                          <p class="font-rustica font-light text-[18px]">
                            {{ cartItem.name }}
                          </p>
                          <p
                            class="text-destructive underline text-[12px] cursor-pointer"
                            @click="cartStore.removeFromCart(cartItem.id)"
                          >
                            Remove Item
                          </p>
                        </div>
                        <div class="hidden sm:flex flex-row gap-[20px] items-center">
                          <p>Qty:</p>
                          <div class="flex flex-row items-center gap-[10px]">
                            <span
                              class="text-[25px] cursor-pointer"
                              @click="
                                cartStore.updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity - 1
                                )
                              "
                              >-</span
                            >
                            <input
                              type="text"
                              :value="cartItem.quantity"
                              class="border-[1px] outline-none w-[30px] text-center"
                              @input="
                                cartStore.updateQuantity(
                                  cartItem.id,
                                  ($event.target as HTMLInputElement)
                                    .valueAsNumber
                                )
                              "
                            >
                            <span
                              class="text-[25px] cursor-pointer"
                              @click="
                                cartStore.updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity + 1
                                )
                              "
                              >+</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-row items-center sm:items-start sm:flex-col justify-between">
                      <div class="flex flex-row sm:flex-col gap-[10px]">
                        <p class="text-[18px] text-dark flex items-center">
                          {{ usePrice(cartItem?.price) }}
                        </p>
                        <p class="text-[16px] text-gray-400 line-through flex items-center">
                          {{ usePrice(cartItem?.price) }}
                        </p>
                      </div>
                      <div class="flex sm:hidden flex-row gap-[20px] items-center">
                          <p>Qty:</p>
                          <div class="flex flex-row items-center gap-[10px]">
                            <span
                              class="text-[25px] cursor-pointer"
                              @click="
                                cartStore.updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity - 1
                                )
                              "
                              >-</span
                            >
                            <input
                              type="text"
                              :value="cartItem.quantity"
                              class="border-[1px] outline-none w-[30px] text-center"
                              @input="
                                cartStore.updateQuantity(
                                  cartItem.id,
                                  ($event.target as HTMLInputElement)
                                    .valueAsNumber
                                )
                              "
                            >
                            <span
                              class="text-[25px] cursor-pointer"
                              @click="
                                cartStore.updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity + 1
                                )
                              "
                              >+</span
                            >
                          </div>
                        </div>
                      <p class="text-[18px] text-dark font-bold flex items-center">
                        {{ usePrice(cartItem?.price * cartItem?.quantity) }}
                      </p>
                    </div>
                  </div>
                  <hr >
                </div>
              </div>
              <CartCheckout />
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="flex flex-col gap-[20px] px-[20px] sm:px-[80px]">
      <div class="flex flex-row gap-[5px] items-center">
        <div class="bg-primary h-[30px] w-[3px]" />
        <p class="text-[20px] font-rustica">More items to explore</p>
      </div>
      <ProductSlider :products="products" :loading="productsLoading" />
    </div>
  </div>
</template>
