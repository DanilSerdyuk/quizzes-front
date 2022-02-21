<template>
  <div class="bg-white p-8 rounded-md w-full">
    <quiz-page-header :is-admin="isAdmin" @setSearch="getQuizzes" />
    <quiz-table
      :list="list"
      :loading="loading"
      :is-admin="isAdmin"
      @delete="deleteQuiz"
      @onAssignee="setAssigneeUsers"
    />
    <quiz-table-pagination
      @nextPage="getQuizzes"
      @prevPage="getQuizzes"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import QuizPageHeader from "@/components/admin/QuizPageHeader";
import QuizTablePagination from "@/components/admin/QuizTablePagination";
import QuizTable from "@/components/admin/QuizTable";
import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/quiz";
import authService from "@/services/api/auth";

export default {
  name: "QuizzesList",
  components: {
    QuizTable,
    QuizPageHeader,
    QuizTablePagination,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters("quiz", {
      list: GETTERS.GET_ALL,
      pagination: GETTERS.PAGINATION,
    }),
    isAdmin() {
      const roles = authService.getRoles();

      return roles.every((i) => i.name === "admin");
    },
  },
  methods: {
    ...mapActions("quiz", {
      getAll: ACTIONS.GET,
      actionDelete: ACTIONS.DELETE,
      assigneeUserAction: ACTIONS.ASSIGNEE,
    }),
    getQuizzes() {
      this.loading = true;

      this.getAll({ ...this.$route.query })
        .finally(() => (this.loading = false))
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    },
    setAssigneeUsers(params) {
      const url = `${window.location.origin}/survey`;

      this.assigneeUserAction({ ...params, url })
        .then(() => this.$toast.success("Quiz has been assigned to users."))
        .then(() => this.$modal.hideAll())
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    },
    deleteQuiz(params) {
      this.actionDelete(params.id)
        .then(() => this.$toast.success("Quiz has been deleted"))
        .then(() => this.$modal.hideAll())
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    },
  },
  created() {
    this.getQuizzes();
  },
};
</script>
