<script setup lang="ts">
import { Search, UserRound, ShoppingCart, Grip } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { useCartStore } from "~/stores/cart";
import { ref } from "vue";

const cartStore = useCartStore();

const isToggled = ref(false)

const toggleState = () => {
  isToggled.value = !isToggled.value;
};
</script>

<template>
  <nav class="border-b sm:border-none border-solid border-gray-300 flex flex-col pb-[30px] sm:pb-0" aria-label="Main navigation">
    <div class="h-[90px] flex flex-row items-center justify-between px-[20px] sm:px-[80px] duration-150">
      <div class="flex flex-row gap-[60px] items-center">
        <NuxtLink to="/" aria-label="Home">
          <img src="@/assets/images/logo.svg" alt="Ecommerce App Logo">
        </NuxtLink>
        <ul class="hidden sm:hidden md:hidden lg:flex flex-row gap-[20px] font-bold text-[18px]">
          <li class="hover:text-[#2A54C7] cursor-pointer" role="menuitem" title="Electronics">Electronics</li>
          <li class="hover:text-[#2A54C7] cursor-pointer" role="menuitem" title="Health & Beauty">Health & Beauty</li>
          <li class="hover:text-[#2A54C7] cursor-pointer" role="menuitem" title="Home & Office">Home & Office</li>
          <li class="hover:text-[#2A54C7] cursor-pointer" role="menuitem" title="Computing">Computing</li>
        </ul>
      </div>
      <div class="flex flex-row gap-[30px] items-center">
        <div class="flex flex-row gap-[20px] items-center">
          <div class="hidden md:block relative w-full max-w-sm items-center">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              class="pl-10"
              aria-label="Search"
            />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Search class="size-4 text-muted-foreground" />
            </span>
          </div>
        </div>
        <div class="flex flex-row items-center gap-[15px] md:gap-0">
          <div
            class="px-[5px] md:px-[15px] py-[5px] rounded-[3px] cursor-pointer flex flex-row gap-[10px] items-center hover:bg-[#2a54c713] duration-150"
            title="Account"
            aria-label="Account"
            role="button"
          >
            <UserRound class="text-muted-foreground" />
            <p class="hidden md:block text-[16px] font-rustica font-light">Account</p>
          </div>
          <NuxtLink
            to="/cart"
            class="px-[5px] md:px-[15px] py-[5px] rounded-[3px] cursor-pointer flex flex-row gap-[10px] items-center hover:bg-[#2a54c713] duration-150"
            title="Cart"
            aria-label="Cart"
          >
            <div class="relative">
              <template v-if="cartStore.cart.length > 0">
                <div
                  class="absolute right-0 mr-[-5px] mt-[-5px] h-[12px] w-[12px] flex justify-center items-center rounded-full bg-destructive text-white text-[10px]"
                  aria-live="polite"
                >
                  {{ cartStore.cart.length }}
                </div>
              </template>
              <ShoppingCart class="text-muted-foreground" />
            </div>
            <p class="hidden md:block text-[16px] font-rustica font-light">Cart</p>
          </NuxtLink>
          <div
            class="lg:hidden px-[4px] py-[4px] rounded-[3px] cursor-pointer flex flex-row gap-[10px] items-center hover:bg-[#2a54c713] duration-150"
            title="Toggle menu"
            aria-label="Toggle menu"
            role="button"
            @click="toggleState"
          >
            <Grip class="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
    <div class="duration-300 overflow-hidden flex justify-center bg-gray-100" :class="{ 'h-[150px]': isToggled, 'h-[0px]': !isToggled }">
      <ul class="flex-col gap-[30px] font-bold text-[18px] justify-center self-center text-center" role="menu">
        <li class="hover:text-[#2A54C7] cursor-pointer" role="menuitem" title="Electronics">Electronics</li>
        <li class="hover:text-[#2A54C7] cursor-pointer" role="menuitem" title="Health & Beauty">Health & Beauty</li>
        <li class="hover:text-[#2A54C7] cursor-pointer" role="menuitem" title="Home & Office">Home & Office</li>
        <li class="hover:text-[#2A54C7] cursor-pointer" role="menuitem" title="Computing">Computing</li>
      </ul>
    </div>
    <div class="block md:hidden relative w-full items-center px-[20px] sm:px-[80px]">
      <Input
        id="search"
        type="text"
        placeholder="Search..."
        class="pl-10"
        aria-label="Search"
      />
      <span class="absolute md:start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-4 text-muted-foreground" />
      </span>
    </div>
  </nav>
</template>
