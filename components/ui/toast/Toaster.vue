<script setup lang="ts">
import { isVNode } from "vue";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from ".";
import { useToast } from "./use-toast";

const { toasts } = useToast();
</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <div class="flex flex-row gap-[10px] items-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="27.2941" height="28" rx="13.6471" fill="#3DAA7E" />
          <path
            d="M12.2353 16.1177L18.353 10L19.2941 10.9412L12.2353 18L8 13.7647L8.94118 12.8236L12.2353 16.1177Z"
            fill="white"
          />
        </svg>
        <div class="grid gap-1">
          <ToastTitle v-if="toast.title">
            {{ toast.title }}
          </ToastTitle>
          <template v-if="toast.description">
            <ToastDescription v-if="isVNode(toast.description)">
              <component :is="toast.description" />
            </ToastDescription>
            <ToastDescription v-else>
              {{ toast.description }}
            </ToastDescription>
          </template>
          <ToastClose />
        </div>
      </div>

      <component :is="toast.action" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
