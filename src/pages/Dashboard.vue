<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>   
	
	<!-- DataTable&TimeLine Ends -->
      <v-flex d-flex lg8 sm12 xs12>
        <stepper/>
      </v-flex>   
	  
      <!-- DataTable&TimeLine Starts -->
      <v-flex d-flex lg8 sm12 xs12>
        <data-table/>
      </v-flex>      
	  
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando.`
    }
  }
}
</script>

<style>

</style>
