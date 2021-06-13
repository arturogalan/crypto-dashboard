<script>
import { formatPropValue } from '../utils/formatUtils'

export default {
  name: 'base-table',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getPropValue(column, row) {
      return formatPropValue({
        n: this.$n,
        value: row[column.id],
        type: column.type,
      })
    },
    getPropClass(column) {
      return {
        'currency': 'text-right pr-10 w-3',
        'percentage': 'text-right w-3',
      }[column.type] || 'text-left pl-2'
    },
    getHeaderPropClass(column) {
      return {
        'currency': 'text-right pr-10 w-3',
      }[column.type] || 'text-left'
    }
  },
}
</script>
<template>
  <table class="table-auto border-collapse">
    <thead>
      <tr>
        <th
          v-for="(column, index) in columns"
          :key="index"
          :class="getHeaderPropClass(column)"

        >
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in rows"
        :key="`row-${rowIndex}`"
        class="
          hover:bg-gray-50
          md:space-y-3
          space-y-4
          p-4
          border-b border-t
          cursor-pointer
        "
      >
        <td
          v-for="(column, colIndex) in columns"
          :key="`row-${rowIndex}-col-${colIndex}`"
          @click.stop="$emit('click', { row, column })"
          class="h-16"
          :class="getPropClass(column)"
        >
          <!-- A slot for the consumer to decide whether he overwrite a specific column or not-->
          <slot :name="column.id" :row="row">
            {{ getPropValue(column, row) }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped></style>
