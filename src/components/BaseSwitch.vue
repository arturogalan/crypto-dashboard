<script>
  export default {
    name: 'base-switch',
    props: {
      label: {
        type: String,
        default: '',
      },
    },
  }
</script>
<template>
  <div class="flex items-center justify-center w-full">
    <label for="toggleB" class="flex items-center cursor-pointer">
      <div class="mr-3 text-green-400 font-medium">
        {{ label }}
      </div>
      <!-- toggle -->
      <div class="relative">
        <!-- input -->
        <input @click.stop="$emit('toggle')" type="checkbox" id="toggleB" class="sr-only">
        <!-- line -->
        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <!-- dot -->
        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
      </div>
    </label>

  </div>
</template>

<style scoped>
  /* Toggle B */
  input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #48bb78;
  }
</style>
