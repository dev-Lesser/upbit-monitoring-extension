<template>
    <v-card>
        <div>
        {{ coin }}
        </div>
        <div>
        {{ price }}
        </div>
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
