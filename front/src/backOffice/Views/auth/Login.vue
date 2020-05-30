<template>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-alert
                color="error"
                :value="error"
                icon="close"
              >
                Password or password incorrect
              </v-alert>
              <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="Name"
                    required
                    prepend-icon="person"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="password"
                    required
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    color="primary"
                    @click="validate"
                    @click.prevent="login()"
                >
                    Login
                </v-btn>
                <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
                >
                    Reset Form
                </v-btn>
            
                <v-btn
                    color="warning"
                    @click="resetValidation"
                >
                    Reset Validation
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
          <!-- <div v-for="todo in allTodos" :key="todo.id" class="todos">
            <p class="todo">
              {{todo.title}}
            </p>
          </div> -->
          <!-- {{ log(plan) }} -->
        <v-row>
        </v-row>
      </v-container>
    </v-content>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
    export default {
      
        name: 'login',
        // computed: mapGetters(['allTodos']),
        computed: mapGetters(['isLoggedIn','authStatus','user']),
        data: () => {
            return {
                valid: true,
                // username: this.$route.params.username == undefined ? '' : this.$route.params.username,
                username:  '' ,

                usernameRules: [
                    v => !!v || 'Name is required',
                ],
                // password:  this.$route.params.username == undefined ? '' : this.$route.params.password,
                password:  '',
                passwordRules: [
                    v => !!v || 'Name is required',
                ],
                error: false

            }
        }
        ,

        methods: {
            ...mapActions(["fetchTodos"]),
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            login() {
              this.$store.dispatch('LOGIN',{
                username: this.username,
                password: this.password
              })
              .then(success => {
                console.log(success)
                this.$router.push('/')
              })
              .catch(error => {
                console.log(error.response.data)
                this.error = true
              })
            },
             log(msg){
              console.log(msg); 
            }
        },
        created() {
          this.fetchTodos()
          this.username = this.$route.params.username == undefined ? '' : this.$route.params.username;
          this.password =  this.$route.params.username == undefined ? '' : this.$route.params.password;
        },
        mounted() {
        },
        
    }
</script>
<style  scoped>
  .todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
  .todo {
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
  }
</style>
