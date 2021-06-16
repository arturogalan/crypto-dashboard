<script>
import { formatPropValue } from '../utils/formatUtils'

export default {
  name: 'base-table',
  props: {
    /**
      * Array of columns descriptor with his properties
      * @id (MANDATORY) field unique identifier and name of the column
      * @title (MANDATORY) the text to be shown for that column
      * @type (MANDATORY) the type of the column-> ['percentage','currency','integer']
      * @isAnimated (OPTIONAL) the column has animation when the value changes
    */
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * An array containg the rows, each row should be an object with the properties named in columns prop
     */
    rows: {
      type: Array,
      default: () => [],
    },
   /**
     * The sorting object indicating
     * @field (MANDATORY) The field to sort
     * @direction (MANDATORY) The direction of the sorting ['asc','desc']
     */
    sorting: {
      type: Object,
      required: true,
    },
    showAnimation: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    getColumnValue(column, row) {
      return formatPropValue({
        n: this.$n,
        value: row[column.id],
        type: column.type,
      })
    },
    getColumnClass(column, row) {
      const value = row[column.id];
      const formatClass = {
        'currency': 'text-right pr-10 w-3',
        'percentage': `text-right w-3 ${value < 0 ? 'text-red-500' : 'text-blue-500'}`,
      }[column.type] || 'text-left pl-2'
      const animatedClass = this.showAnimation && column.isAnimated ? 'bounce-animated' : '';
      return [formatClass, animatedClass].join(' ');
    },
    getHeaderClass(column) {
      return {
        'currency': 'text-right pr-10 w-3',
      }[column.type] || 'text-left'
    },
    getSortingIcon(column) {
      if (this.sorting.field === column.id) {
        return this.sorting.direction;
      }
    },
    getColumnKey(column, colIndex, rowIndex, row) {
      //If column is animated the column value is part of the key to trigger animation when value changes
      if (column.isAnimated) {
        return `row-${rowIndex}-col-${colIndex}-value-${this.getColumnValue(column, row)}`;
      } else {
        return `row-${rowIndex}-col-${colIndex}`;
      }

    }
  },
  computed: {
    computedSorting() {
      return this.sorting 
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
          :class="getHeaderClass(column)"
          class="whitespace-nowrap cursor-pointer"
          @click.stop="$emit('sortColumn', column)"
        >
          {{ $t(column.title) }}
          <span v-if="getSortingIcon(column) === 'asc'" role="img">🔼</span>
          <span v-else-if="getSortingIcon(column) === 'desc'" role="img">🔽</span>
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
          :key="getColumnKey(column, colIndex, rowIndex, row)"
          @click.stop="$emit('click', { row, column })"
          class="h-16"
          :class="getColumnClass(column, row)"
        >
          <!-- A slot for the consumer to decide whether he overwrite a specific column or not-->
          <slot :name="column.id" :row="row">
            {{ getColumnValue(column, row) }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped>
  .bounce-animated {
    animation: pulse_animation_very_tiny 0.5s;
  }
  @keyframes pulse_animation_very_tiny {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
