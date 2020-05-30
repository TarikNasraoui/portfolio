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
                <v-toolbar-title>Register form</v-toolbar-title>
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
                    v-model="firstName"
                    :rules="firstNameRules"
                    label="First Name"
                    required
                    prepend-icon="person"
                  ></v-text-field>
                <v-text-field
                    v-model="lastName"
                    :rules="lastNameRules"
                    label="Last Name"
                    required
                    prepend-icon="person"
                  ></v-text-field>

                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="User Name"
                    required
                    prepend-icon="person"
                  ></v-text-field>

                  <v-text-field
                    v-model="adress"
                    :rules="adressRules"
                    label="Adress"
                    required
                    prepend-icon="person"
                  ></v-text-field>

                  <v-text-field
                    v-model="phone"
                    :rules="phoneRules"
                    label="Phone"
                    required
                    prepend-icon="person"
                  ></v-text-field>

                  <v-text-field
                    v-model="role"
                    :rules="roleRules"
                    label="Role"
                    required
                    prepend-icon="person"
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
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
                    @click.prevent="register()"
                >
                    Register
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
          <!-- {{ log(this.$store.getters.user) }} -->
        <v-row>
        </v-row>
      </v-container>
    </v-content>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'Register',
        // computed: mapGetters(['allTodos']),
        computed: mapGetters(['isLoggedIn','authStatus','user']),
        data: () => ({
            valid: true,
            firstName: '',
            firstNameRules: [
                v => !!v || 'firstName is required',
            ],
            lastName: '',
            lastNameRules: [
                v => !!v || 'lastName is required',
            ],
            username: '',
            usernameRules: [
                v => !!v || 'username is required',
            ],

            adress: '',
            adressRules: [
                v => !!v || 'adress is required',
            ],

            phone: '',
            phoneRules: [
                v => !!v || 'phone is required',
            ],

            role: '',
            roleRules: [
                v => !!v || 'role is required',
            ],


            password: '',
            passwordRules: [
                v => !!v || 'Name is required',
            ],
            error: false,


        }),

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
            register() {
              const user = {
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                address: this.adress,
                phone: this.phone,
                role: this.role,
                password: this.password
              }
              console.log(user)
              this.$store.dispatch('register',user)
              .then(()=>{
                this.$router.push({name: 'login', params: {username: user.username, password: user.password}})

                // this.$router.push({ path: '/login', params: { plan: 'private' }})
              })
              .catch((error)=> console.log(error))
            },
             log(msg){
              console.log(msg); 
            }
        },
        created() {
          this.fetchTodos()
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
