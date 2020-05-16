<template>
    <div>
        <Navbar />
        <v-content class="ma-4">
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