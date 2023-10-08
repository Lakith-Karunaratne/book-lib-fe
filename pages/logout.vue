<template>
    <div> Logout Page</div>
    <p> Proceed to Logout </p>
    <div class="my-4 mx-10 items-center">
        <UForm :schema="schema" :state="state" @submit="submit">


            <UButton type="submit" class="my-4">
                Login
            </UButton>
        </UForm>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { object, string, InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import nuxtStorage from 'nuxt-storage';

definePageMeta({
        layout: "postlogin",
    })

const router = useRouter();

const date = new Date();

const schema = object({
    datetime: string(),
})

type Schema = InferType<typeof schema>

const state = ref({
    datetime: new Date()
})

async function submit(event: FormSubmitEvent<Schema>) {
    // API TRIGGER HERE
    console.log(event.data)
    nuxtStorage.localStorage.removeItem('access_token');
    router.push({ path: '/' })
}

</script>