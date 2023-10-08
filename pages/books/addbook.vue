<template>
    <div class="my-4 text-center">
        <h1>
            Add Book Form
        </h1>
    </div>

    <div class="my-4 mx-10">
        <UForm :schema="schema" :state="state" @submit="submit">
            <UFormGroup label="Title" name="title">
                <UInput v-model="state.title" />
            </UFormGroup>

            <UFormGroup label="Author" name="author">
                <UInput v-model="state.author" type="text" />
            </UFormGroup>

            <UFormGroup label="ISBN" name="isbn">
                <UInput v-model="state.isbn" type="text" />
            </UFormGroup>

            <UFormGroup label="Date Published" name="published_date">
            
                <UInput v-model="state.published_date" type="text" />

                <!-- <div class="PublishDateInput">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="date"
                            class="bg-green-200 text-blue-500" />
                        <template #panel="{ close }">
                            <DatePicker v-model="date" type="Date" @close="close" />
                        </template>
                    </UPopover>
                </div> -->

            </UFormGroup>

            <UButton type="submit" class="my-4">
                Submit
            </UButton>
        </UForm>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    layout: "postlogin",
})

import { ref } from 'vue'
import { object, string, InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import nuxtStorage from 'nuxt-storage';

const router = useRouter();

const at_tkn = await nuxtStorage.localStorage.getData('access_token');
console.log("at_tkn:", at_tkn)

const date = new Date();

const schema = object({
    title: string().required('Required'),
    author: string().required('Required'),
    isbn: string(),
    published_date: string(),
})

type Schema = InferType<typeof schema>

const state = ref({
    title: undefined,
    author: undefined,
    isbn: undefined,
    published_date: undefined
})


async function makePostRequestWithToken(url, token, form_data) {

    const requestBody = {
        'title': form_data.title,
        'author': form_data.author,
        'published_date': form_data.published_date,
        'ISBN': form_data.isbn
    };

    const { data, pending, error, refresh } = await useFetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Adjust content type if needed
        },
        body: requestBody
    });
    return data["_rawValue"] // Returns Array

};


async function submit(event: FormSubmitEvent<Schema>) {
    // API TRIGGER HERE
    console.log(event.data)

    const resp = await makePostRequestWithToken("http://localhost:8000/books/", at_tkn, event.data)

    if (resp) {
        // Redirect to the /books page
        router.push({ path: '/books' })
    };
}


</script>