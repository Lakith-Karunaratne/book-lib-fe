<template>
    <div class="my-4 text-center">
        <h1>
            Login to Personal Book Library
        </h1>
    </div>
    <div class="my-4 mx-10">
        <UForm :schema="schema" :state="state" @submit="submit">
            <UFormGroup label="User name" name="username">
                <UInput v-model="state.username" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton type="submit" class="my-4">
                Submit
            </UButton>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { object, string, InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
// import { useStore } from 'vuex' // Import the store module
import { useFetch } from '@vueuse/core'
import { useToken } from '../composables/loginstate';
import nuxtStorage from 'nuxt-storage';

const router = useRouter();

const schema = object({
    // email: string().email('Invalid email').required('Required'),
    username: string().required('Required'),
    password: string()
        .min(2, 'Must be at least 2 characters')
        .required('Required')
});

type Schema = InferType<typeof schema>

const state = ref({
    username: undefined,
    password: undefined
})


async function submit(event: FormSubmitEvent<Schema>) {

    const formData = new URLSearchParams();
    formData.append('username', event.data.username);
    formData.append('password', event.data.password);
    formData.append('grant_type', 'password');

    const response = await useFetch("http://localhost:8000/token", {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
    });

    const data = await response.json();
    // console.log("data:",data.data.value)
    const json_val = JSON.parse(data.data.value)
    // console.log("key:", json_val["access_token"])
    if (json_val["access_token"]) {
        // Redirect to the /books page
        router.push({path:'/books'})
    };

    // const token_state = useState('token_state', () => ({
    //     'access_token': json_val["access_token"]
    // }))
    const current_token = useToken();
    current_token.value = json_val["access_token"]

    await nuxtStorage.localStorage.setData('access_token',json_val["access_token"], 30)
};

</script>