<script>
  export default {
    name: 'base-card',
    props: {
      /**
       * Array of rows descriptors with fields
       * @id (MANDATORY) unique identifier
       * @title (MANDATORY) the path in the row to get the value of the column, can be with dots
       * @type (MANDATORY) [profile,date,number,currency]
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
      getPropValue(cardProp) {
        const propValue = parseFloat(this.cardContent[cardProp.id]);
        console.table(this.cardContent);
        return {
          'percent': this.$n(propValue/100, 'percentage'),
          'currency': this.$n(propValue, 'currency'),
        }[cardProp.type] || propValue
        // return this.cardContent[cardProp.id]
      }
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
                    {{ cardProp.title }}
                </p>
                <p>
                    {{ getPropValue(cardProp) }}
                </p>
            </div>
        </div>
    </div>
</div>
</template>
