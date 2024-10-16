<script setup lang="ts">
import { usePrice } from "../../composables/usePrice";
import { useCartStore } from "#imports";

const cartStore = useCartStore();
const shipping = 45;
</script>

<template>
  <div
    className="flex-[3] gap-[15px] self-start flex flex-col py-[12px] rounded-[6px] bg-white border border-solid border-gray-200  w-[100%] sm:w-[400px] p-[20px]"
  >
    <h1 className="text-[14px] font-bold text-gray-500">Summary</h1>

    <div className="flex flex-row items-center justify-between gap-[10px] text-[13px]">
      <p className="text-[14px] font-rustica font-light">Subtotal</p>
      <p class="text-[18px] text-dark">
        {{ usePrice(cartStore.totalPrice) }}
      </p>
    </div>
    <div className="flex flex-row items-center justify-between gap-[10px] text-[13px]">
      <p className="text-[14px] font-rustica font-light">Shipping Fee</p>
      <p class="text-[18px] text-dark">
        {{ usePrice(shipping) }}
      </p>
    </div>
      <div className="flex flex-row items-center justify-between gap-[10px]">
        <p className="text-[18px] font-rustica font-light">Total</p>
        <p class="text-[24px] text-dark font-bold">
          {{ usePrice(cartStore.totalPrice + shipping) }}
        </p>
      </div>
      <Button title="Proceed to Checkout" class="self-center bg-primary hover:bg-primary-hover" aria-label="Proceed to Checkout">
          Proceed to Checkout
        </Button>
  </div>
</template>
