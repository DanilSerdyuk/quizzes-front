<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full dark:border-gray-800 rounded "
    v-on="$listeners"
  >
    <div class="relative h-full bg-white rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      <div class="flex justify-end p-2">
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="popup-modal"
          @click="$emit('cancel', close)"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6 pt-0 text-center">
        <slot name="icon"></slot>
        <slot name="title"></slot>
        <slot name="select"></slot>
        <button
          data-modal-toggle="popup-modal"
          type="button"
          @click="$emit('confirm', { close, id: params.id })"
          :class="`mr-4 text-white bg-${confirmColorButton}-600 hover:bg-${confirmColorButton}-800 focus:ring-4 focus:ring-${confirmColorButton}-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`"
        >
          All correct
        </button>
        <button
          @click="$emit('cancel', close)"
          data-modal-toggle="popup-modal"
          type="button"
          class="ml-4 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
        >
          No, cancel
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: "ModalConfirmComponent",
  inheritAttrs: false,
  props: {
    confirmColorButton: {
      type: String,
      default: () => "red",
    },
  },
};
</script>
