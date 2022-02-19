<template>
  <div>
    <nav-bar></nav-bar>
    <quiz-table
      :list="list"
      :pagination="pagination"
      :loading="loading"
      @delete="setDeleteQuiz"
    />
    <modal-component
      name="quizDelete"
      v-model="modal"
      @confirm="deleteQuiz"
      @cancel="modal = !modal"
    >
      <template v-slot:title>
        <h3 class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this quiz?
        </h3>
      </template>
    </modal-component>
  </div>
</template>

<script>
import ModalComponent from "@/components/global/ModalComponent";
import NavBar from "@/components/global/NavBar";
import QuizTable from "@/components/admin/QuizTable";
import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/quiz";

export default {
  name: "QuizzesList",
  components: {
    NavBar,
    QuizTable,
    ModalComponent,
  },
  data() {
    return {
      modal: false,
      loading: true,
    };
  },
  computed: {
    ...mapGetters("quiz", {
      list: GETTERS.GET_ALL,
      pagination: GETTERS.PAGINATION,
    }),
  },
  methods: {
    ...mapActions("quiz", {
      getAll: ACTIONS.GET,
      actionDelete: ACTIONS.DELETE,
    }),
    setDeleteQuiz(id) {
      this.$modal.show("quizDelete", { id });
    },
    deleteQuiz(params) {
      this.actionDelete(params.id)
        .then(() => this.$toast.success("Quiz has been deleted"))
        .then(() => (this.modal = !this.modal))
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    },
  },
  created() {
    this.getAll().then(() => (this.loading = !this.loading));
  },
};
</script>
