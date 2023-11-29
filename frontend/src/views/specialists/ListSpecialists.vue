<template>
    <section class="page-section">
          <b-container>
              <HeaderPage title="Gestão de Especialistas" />
              <b-row class="mb-4">
                  <b-col cols="1"></b-col>
                  <b-col>
                      <router-link :to="{name:'addSpecialist'}" tag="button" class="btn btn-outline-success mr-2 mt-2">
                          <i class="fas fa-plus-square"></i> ADICIONAR ESPECIALISTA
                      </router-link>
                      <router-link :to="{name:'admin'}" tag="button" class="btn btn-outline-info mr-2 mt-2">
                          <i class="fas fa-bars"></i> MENU PRINCIPAL
                      </router-link>
                  </b-col>
                  <b-col cols="1"></b-col>
              </b-row>
              <b-row>
                  <b-col cols="1"></b-col>
                  <b-col>
                      <table class="table table-striped">
                          <thead class="thead-dark">
                              <tr>
                                  <th scope="col">
                                      NOME
                                      <i class="fas fa-arrow-up" v-if="sortType===1" @click="sort()"></i>
                                      <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                                  </th>
                                  <th scope="col">GRUPO</th>
                                  <th scope="col">AÇÕES</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="specialist of specialists" :key="specialist._id">
                                  <td class="pt-4">{{specialist.name}}</td>
                                  <td class="pt-4">{{specialist.group}}</td>
                                  <td>
                                      <router-link :to="{name:'editSpecialist', params:{specialistId: specialist._id}}" tag="button"
                                          class="btn btn-outline-success mr-2 mt-2">
                                          <i class="fas fa-edit"></i> EDITAR
                                      </router-link>
                                      <button @click="viewSpecialist(specialist._id)" type="button"
                                          class="btn btn-outline-success mr-2 mt-2">
                                          <i class="fas fa-search"></i> VER
                                      </button>
                                      <button @click="removeSpecialist(specialist._id)" type="button"
                                          class="btn btn-outline-danger mr-2 mt-2">
                                          <i class="fas fa-trash-alt"></i> REMOVER
                                      </button>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </b-col>
                  <b-col cols="1"></b-col>
              </b-row>
          </b-container>
      </section>
  </template>
  
  <script>
  import { FETCH_SPECIALISTS, REMOVE_SPECIALIST } from "@/store/specialists/specialist.constants";
  import { mapGetters } from "vuex";
  import HeaderPage from "@/components/HeaderPage.vue"
  export default {
      name: "ListSpecialists",
      components: {
          HeaderPage
      },
      data: function () {
          return {
              specialists: [],
              sortType: 1
          };
      },
      computed: {
          ...mapGetters("specialist", ["getSpecialists", "getMessage"])
      },
      methods: {
          fetchSpecialists() {
              this.$store.dispatch(`specialist/${FETCH_SPECIALISTS}`).then(
                  () => {
                      this.specialists = this.getSpecialists;
                  }, err => {
                      this.$alert(`${err.message}`, 'Erro', 'error');
                  });
          },
          sort() {
              this.specialists.sort(this.compareNames)
              this.sortType *= -1
          },
          compareNames(q1, q2) {
              if (q1.name > q2.name) return 1 * this.sortType
              else if (q1.name < q2.name) return -1 * this.sortType
              else return 0
          },
          viewSpecialist(id) {
              const specialist = this.specialists.find(specialist => specialist._id === id);
              this.$fire({
                  title: "ESPECIALISTA",
                  html: this.generateTemplate(specialist)
              });
          },
          generateTemplate(specialist) {
              let response = `<br>
              <div style='width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column;'>
                  <p><b>NOME: </b>${specialist.name}</p>
                  <p><b>GRUPO: </b>${specialist.group}</p>
              </div>`;
              return response;
          },
          removeSpecialist(id) {
              this.$confirm(
                  "Se sim, clique em OK",
                  "Deseja mesmo remover o Especialista?",
                  "warning", {
                      confirmButtonText: "OK",
                      cancelButtonText: "Cancelar"
                  }
              ).then(
                  () => {
                      this.$store.dispatch(`specialist/${REMOVE_SPECIALIST}`, id).then(
                          ()=>{
                              this.$alert(
                                  this.getMessage,
                                  "Especialista removido!",
                                  "success"
                              );
                              this.fetchSpecialists();
                          },
                          err => {
                              this.$alert(`${err.message}`, "Não foi possível remover o Especialista.", "error");
                          }
                      );
                  },
                  () => {
                      this.$alert("Remoção cancelada!", "Informação", "info");
                  }
              );
          }
      },
      created() {
          this.fetchSpecialists();
      }
  };
  </script>