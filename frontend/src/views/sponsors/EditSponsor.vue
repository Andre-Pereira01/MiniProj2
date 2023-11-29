<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Editar Patrocinador" />
            <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <form @submit.prevent="update">
                        <div class="form-group">
                            <input v-model="sponsor.name" type="text" class="form-control form-control-lg" id="txtName"
                                placeholder="Nome do Patrocinador" required />
                        </div>
                        <div class="form-group">
                            <select id="sltType" class="form-control form-control-lg" v-model="sponsor.animal" required>
                                <option v-for="animal of animals" :key="animal._id">{{animal.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input v-model="sponsor.quota" type="text" class="form-control form-control-lg" id="txtCity"
                                placeholder="Indique o valor da quota" required/>
                        </div>
                        <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                            <i class="fas fa-edit"></i> ATUALIZAR
                        </button>
                        <router-link :to="{name: 'listSponsors'}" tag="button" class="btn btn-outline-danger btn-lg">
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
import { EDIT_SPONSOR } from "@/store/sponsors/sponsor.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
    name: "EditSponsor",
    components: {
        HeaderPage
    },  
    data: () => {
        return {
            sponsor: {},
            animals: []
        };
    },
    computed: {
        ...mapGetters("sponsor", ["getSponsorById", "getMessage"]),
        ...mapGetters("animal", ["getAnimals"])
    },
    methods: {
        update() {
            this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, this.$data.sponsor).then(
                () => {
                    this.$alert(this.getMessage, "Patrocinador atualizado!", "success");
                    router.push({
                        name: "listSponsors"
                    });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        },
        fetchAnimals() {
            this.$store.dispatch(`animal/${FETCH_ANIMALS}`).then(
                () => {
                    this.animals = this.getAnimals;
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        }
    },
    created() {
        this.sponsor = this.getSponsorById(this.$route.params.sponsorId);
        this.fetchAnimals();
    }
};
</script>
  
<style scoped>
    .center_div {
        margin: 0 auto;
        width: 80%;
    }
</style>