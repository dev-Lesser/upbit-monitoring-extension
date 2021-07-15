<template>
    <v-card height="100" class="ma-3 pa-3 coin_box">
        <v-chip outlined >
            {{ coin }} {{info}}
        </v-chip>
        <v-chip outlined >
            {{ value }} 원
        </v-chip>

    </v-card>
</template>

<script>

export default ({
    props:{
        coin: String,
        info: String,
        value: Number,
    },
    async created(){
    },
    computed:{
      price(){
        return this.$store.state.coinPrices;
      }
    },
})
</script>
<style scoped>
.coin_box {
    /* display: flex;
    justify-content: center;
    align-content: center; */
}
</style>