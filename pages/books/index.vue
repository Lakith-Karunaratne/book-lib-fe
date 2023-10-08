<template>
    <div>
        <div class="mb-4 my-4 mx-4">
            <UInput v-model="q" placeholder="Filter books..." />
        </div>
        <div class="overflow-y-auto">
            <UTable class="w-full" v-model="selected" :rows="currentPageRows" :columns="columns">
                <template #name-data="{ row }">
                    <span
                        :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{
                            row.name }}</span>
                </template>
    
                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
            </UTable>

        </div>

        <UPagination v-model="page" :page-count="pageCount" :total="filteredRows.length" class="mt-4" />
    </div>
</template>
  
<script setup>
import { toRaw } from 'vue';
import { useToken } from '../../composables/loginstate';
import nuxtStorage from 'nuxt-storage';


const access_token_head = await useToken()
console.log("books a_t:", access_token_head.value)

const at_tkn = await nuxtStorage.localStorage.getData('access_token');
console.log("at_tkn:", at_tkn)

definePageMeta({
    layout: "postlogin",
})

// "auto_id": 1,
// "author": "Samson",
// "date_created": "2023-10-06T23:36:15.302125+00:00",
// "ISBN": null,
// "published_date": null,
// "title": "Eddy's Life",
// "uuid": "f22819e1-70e2-4d8e-9440-91cc467bc0bf",
// "date_updated": null

const columns = [
    { key: 'auto_id', label: 'ID', sortable: true },
    { key: 'title', label: 'Book Name', sortable: true },
    { key: 'author', label: 'Author', sortable: true },
    { key: 'published_date', label: 'Publication Date', sortable: true },
    { key: 'ISBN', label: 'ISBN', sortable: true },
    // { key: 'cover_image', label: 'Cover Image', sortable: true },
    { key: 'actions' },
];

async function makeGetRequestWithToken(url, token) {
    const { data, pending, error, refresh } = await useFetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust content type if needed
        },
      });
    return data["_rawValue"] // Returns Array
    
  };

// const data = await makeGetRequestWithToken("http://localhost:8000/books/",access_token_head.value)
const data = await makeGetRequestWithToken("http://localhost:8000/books/",at_tkn)

console.log(data)

const books = data

// const books = 
// [
//   {
//     "auto_id": 1,
//     "title": "The Catcher in the Rye",
//     "author": "J.D. Salinger",
//     "published_date": "July 16, 1951",
//     "ISBN": "0316769177",
//     "cover_image": "https://example.com/catcher-in-the-rye.jpg"
//   },
//   {
//     "auto_id": 2,
//     "title": "To Kill a Mockingbird",
//     "author": "Harper Lee",
//     "published_date": "July 11, 1960",
//     "ISBN": "0061120081",
//     "cover_image": "https://example.com/to-kill-a-mockingbird.jpg"
//   },
//   {
//     "auto_id": 3,
//     "title": "1984",
//     "author": "George Orwell",
//     "published_date": "June 8, 1949",
//     "ISBN": "0451524934",
//     "cover_image": "https://example.com/1984.jpg"
//   },
//   {
//     "auto_id": 4,
//     "title": "The Great Gatsby",
//     "author": "F. Scott Fitzgerald",
//     "published_date": "April 10, 1925",
//     "ISBN": "0743273567",
//     "cover_image": "https://example.com/the-great-gatsby.jpg"
//   },
//   {
//     "auto_id": 5,
//     "title": "Moby-Dick",
//     "author": "Herman Melville",
//     "published_date": "October 18, 1851",
//     "ISBN": "1853260086",
//     "cover_image": "https://example.com/moby-dick.jpg"
//   },
//   {
//     "auto_id": 6,
//     "title": "Pride and Prejudice",
//     "author": "Jane Austen",
//     "published_date": "January 28, 1813",
//     "ISBN": "0141439513",
//     "cover_image": "https://example.com/pride-and-prejudice.jpg"
//   },
//   {
//     "auto_id": 7,
//     "title": "The Hobbit",
//     "author": "J.R.R. Tolkien",
//     "published_date": "September 21, 1937",
//     "ISBN": "0618260307",
//     "cover_image": "https://example.com/the-hobbit.jpg"
//   },
//   {
//     "auto_id": 8,
//     "title": "The Lord of the Rings",
//     "author": "J.R.R. Tolkien",
//     "published_date": "July 29, 1954",
//     "ISBN": "0618640150",
//     "cover_image": "https://example.com/the-lord-of-the-rings.jpg"
//   },
//   {
//     "auto_id": 9,
//     "title": "War and Peace",
//     "author": "Leo Tolstoy",
//     "published_date": "1869",
//     "ISBN": "0198790973",
//     "cover_image": "https://example.com/war-and-peace.jpg"
//   },
//   {
//     "auto_id": 10,
//     "title": "The Odyssey",
//     "author": "Homer",
//     "published_date": "8th century BCE",
//     "ISBN": "0140268863",
//     "cover_image": "https://example.com/the-odyssey.jpg"
//   },
//   {
//     "auto_id": 11,
//     "title": "The Hitchhiker's Guide to the Galaxy",
//     "author": "Douglas Adams",
//     "published_date": "October 12, 1979",
//     "ISBN": "0345391802",
//     "cover_image": "https://example.com/hitchhikers-guide.jpg"
//   },
//   {
//     "auto_id": 12,
//     "title": "Brave New World",
//     "author": "Aldous Huxley",
//     "published_date": "1932",
//     "ISBN": "0060850523",
//     "cover_image": "https://example.com/brave-new-world.jpg"
//   },
//   {
//     "auto_id": 13,
//     "title": "The Road",
//     "author": "Cormac McCarthy",
//     "published_date": "September 26, 2006",
//     "ISBN": "0307265439",
//     "cover_image": "https://example.com/the-road.jpg"
//   },
//   {
//     "auto_id": 14,
//     "title": "The Alchemist",
//     "author": "Paulo Coelho",
//     "published_date": "1988",
//     "ISBN": "0061122416",
//     "cover_image": "https://example.com/the-alchemist.jpg"
//   },
//   {
//     "auto_id": 15,
//     "title": "The Shining",
//     "author": "Stephen King",
//     "published_date": "January 28, 1977",
//     "ISBN": "0385121679",
//     "cover_image": "https://example.com/the-shining.jpg"
//   },
//   {
//     "auto_id": 16,
//     "title": "Harry Potter and the Philosopher's Stone",
//     "author": "J.K. Rowling",
//     "published_date": "June 26, 1997",
//     "ISBN": "0747532699",
//     "cover_image": "https://example.com/harry-potter.jpg"
//   },
//   {
//     "auto_id": 17,
//     "title": "The Hunger Games",
//     "author": "Suzanne Collins",
//     "published_date": "September 14, 2008",
//     "ISBN": "0439023483",
//     "cover_image": "https://example.com/hunger-games.jpg"
//   },
//   {
//     "auto_id": 18,
//     "title": "The Da Vinci Code",
//     "author": "Dan Brown",
//     "published_date": "March 18, 2003",
//     "ISBN": "0385504209",
//     "cover_image": "https://example.com/da-vinci-code.jpg"
//   },
//   {
//     "auto_id": 19,
//     "title": "The Girl with the Dragon Tattoo",
//     "author": "Stieg Larsson",
//     "published_date": "August 28, 2005",
//     "ISBN": "0307269752",
//     "cover_image": "https://example.com/girl-with-dragon-tattoo.jpg"
//   },
//   {
//     "auto_id": 20,
//     "title": "The Fault in Our Stars",
//     "author": "John Green",
//     "published_date": "January 10, 2012",
//     "ISBN": "0525478817",
//     "cover_image": "https://example.com/fault-in-our-stars.jpg"
//   }
// ];

const q = ref('');
const selected = ref([]);
const page = ref(1);
const pageCount = 5;

const items = (row) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => console.log('Edit', row.id),
        },
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
        },
    ],
];

const filteredRows = computed(() => {
    if (!q.value) {
        return books;
    }
    return books.filter((book) => {
        return Object.values(book).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase());
        });
    });
});

const paginationConfig = computed(() => {
    return {
        enabled: true,
        perPage: pageCount,
    };
});

const currentPageRows = computed(() => {
    const start = (page.value - 1) * pageCount;
    const end = start + pageCount;
    return filteredRows.value.slice(start, end);
});

function select(row) {
    const index = selected.value.findIndex((item) => item.id === row.id);
    if (index === -1) {
        selected.value.push(row);
    } else {
        selected.value.splice(index, 1);
    }
}
</script>
  