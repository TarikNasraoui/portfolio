<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="title"
        :counter="10"
        :rules="titleRules"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="slogan"
        :counter="10"
        :rules="sloganRules"
        label="slogan"
        required
      ></v-text-field>

      <v-text-field
        v-model="about"
        :counter="10"
        :rules="aboutRules"
        label="about"
        required
      ></v-text-field>
  
      <v-select
        v-model="services"
        :items="serviceItems"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
         @click.prevent="addProfile"
      >
        Validate
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
    </v-form>
</template>
<script>
  // import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'AddProfile',
  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'title is required',
      v => (v && v.length <= 10) || 'title must be less than 10 characters',
    ],
    slogan: '',
    sloganRules: [
      v => !!v || 'slogan is required',
      v => (v && v.length <= 10) || 'slogan must be less than 10 characters',
    ],
    about: '',
    aboutRules: [
      v => !!v || 'about is required',
      v => (v && v.length <= 10) || 'about must be less than 10 characters',
    ],
    services: '',
    serviceItems: [
      'intergtation',
      'developpement It',
    ]  
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    addProfile(){
      const profile = {
        title: this.title,
        slogan: this.slogan,
        about: this.about,
        services: this.services
      }
      console.log(profile)
      this.$store.dispatch('newProfile',profile)
       .then((data)=>{
            console.log(data)    
        })
        .catch((error)=> console.log(error))
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
}
</script>