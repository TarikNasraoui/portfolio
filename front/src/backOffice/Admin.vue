<template>
    <div>
        <Navbar />
        <v-content>
            <router-view></router-view>
        </v-content>
        <Footer />
    </div>
    
</template>



<script>
 import Navbar from './components/Navbar'
 import Footer from './components/Footer'
export default {
  name: 'Admin',
   components: {
        Navbar,
        Footer
    }
}
</script>

<style>
 .v-content {
    padding-left: 140px !important;
    padding-right: 15px !important;
  }
</style>
