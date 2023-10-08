<template>
    <div> Book {{ $route.params.id }} </div>
</template>

<script setup>
    definePageMeta({
        layout: "postlogin",
    })
</script>