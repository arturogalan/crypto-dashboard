<script>
  import { formatPropValue } from '../utils/formatUtils'

  export default {
    name: 'base-card',
    props: {
      /**
       * Array of fields descriptors with this properties
       * @id (MANDATORY) field unique identifier and name of the object prop
       * @title (MANDATORY) the text to be shown for that field
       * @type (MANDATORY) the type of the field-> ['percentage','currency']
      */      
      cardProperties: {
        type: Array,
        required: true,
      },
      /**
       * The object with the values to be shown in the card
       */
      cardContent: {
        type: Object,
        required: true,
      }
    },
    methods: {
      getFieldValue(cardProp, cardContent) {
        return formatPropValue({
          n: this.$n,
          value: cardContent[cardProp.id],
          type: cardProp.type,
        })
      },
      getFieldClass(column, row) {
        const value = row[column.id];
        return {
          'percentage': `${value < 0 ? 'text-red-500' : 'text-blue-500'}`,
        }[column.type] || ''
      },      
    },
  }
</script>

<template>
<div class="flex items-center justify-center px-4">
    <div class="max-w-4xl bg-white w-full rounded-lg shadow-xl">
        <div class="p-4 border-b">
            <h2 class="text-4xl font-bold">
              <slot name="title"/>
            </h2>
            <p class="text-base text-gray-500">
              <slot name="subtitle"/>
            </p>
        </div>
        <div>
            <div
              v-for="(cardProp, index) in cardProperties"
              :key="`cardProp-${index}`"
              class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
            >
                <p class="text-gray-600">
                    {{ $t(cardProp.title) }}
                </p>
                <p :class="getFieldClass(cardProp, cardContent)">
                    {{ getFieldValue(cardProp, cardContent) }}
                </p>
            </div>
        </div>
    </div>
</div>
</template>
