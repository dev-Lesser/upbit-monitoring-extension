<template>
    <v-card>
        <v-chip outlined>
        {{ coin }}
        </v-chip>
        <v-chip outlined>
        {{ price }}
        </v-chip>
    </v-card>
</template>

<script>

export default ({
    props:{
        coin: String,
        price: Number,
    }
})
</script>
