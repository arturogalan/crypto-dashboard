<script>
export default {
  name: 'base-table',
  props: {
    columns: {
      type: Array,
      default: ()=> [],
    },
    rows: {
      type: Array,
      default: ()=> [],
    }
  },
}
</script>
<template>
  <table class="table-auto border-collapse border border-green-800">
  <thead>
    <tr>
      <th
        v-for="(column, index) in columns"
        :key="index"
        class="border border-green-600 bg-green-400"
      >
        {{ column.title }}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="(row, rowIndex) in rows"
      :key="`row-${rowIndex}`"
      class="cursor-pointer"

    >
      <td
        v-for="(column, colIndex) in columns"
        :key="`row-${rowIndex}-col-${colIndex}`"
        @click.stop="$emit('click', {row, column})"
        class=""
      >
        {{ row[column.id] }}
      </td>
    </tr>  
  </tbody>
</table>
</template>


<style scoped>
tr:hover {
  @apply bg-green-600;
  /* background-color:#f5f5f5; */
}
tr{
  @apply bg-green-100;
}
</style>