<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Editar Especialista" />
            <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <form @submit.prevent="update">
                        <div class="form-group">
                            <input v-model="specialist.name" type="text" class="form-control form-control-lg" id="txtName"
                                placeholder="Nome do Especialista" required />
                        </div>
                        <div class="form-group">
                            <select id="sltType" class="form-control form-control-lg" v-model="specialist.group" required>
                                <option value="anfibio">ANFÍBIO</option>
                                <option value="ave">AVE</option>
                                <option value="mamífero">MAMÍFERO</option>
                                <option value="peixe">PEIXE</option>
                                <option value="reptil">RÉPTIL</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                            <i class="fas fa-edit"></i> ATUALIZAR
                        </button>
                        <router-link :to="{name: 'listSpecialists'}" tag="button" class="btn btn-outline-danger btn-lg">
                            <i class="fas fa-window-close"></i> CANCELAR
                        </router-link>
                    </form>
                </b-col>
                <b-col cols="2"></b-col>
            </b-row>
        </b-container>
    </section>
</template>
  
<script>
import { EDIT_SPECIALIST } from "@/store/specialists/specialist.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
    name: "EditSpecialist",
    components: {
        HeaderPage
    },  
    data: () => {
        return {
            specialist: {}
        };
    },
    computed: {
        ...mapGetters("specialist", ["getSpecialistById", "getMessage"])
    },
    methods: {
        update() {
            this.$store.dispatch(`specialist/${EDIT_SPECIALIST}`, this.$data.specialist).then(
                () => {
                    this.$alert(this.getMessage, "Especialista atualizado!", "success");
                    router.push({
                        name: "listSpecialists"
                    });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        }
    },
    created() {
        this.specialist = this.getSpecialistById(this.$route.params.specialistId);
    }
};
</script>

<style scoped>
    .center_div {
        margin: 0 auto;
        width: 80%;
    }
</style>