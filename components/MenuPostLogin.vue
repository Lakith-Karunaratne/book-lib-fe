<template>
    <header>
        <nav class="bg-green-500 py-4">
            <div class="container mx-auto flex justify-between items-center">
                <ul class="flex space-x-4 items-center">
                    <li>
                        <NuxtLink to="/books" class="text-white hover:text-gray-300">Library</NuxtLink>
                    </li>
                    <li class="ml-auto">
                        <NuxtLink to="/books/addbook" class="text-white hover:text-gray-300">Add Book</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/logout" class="btn px-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">Logout</NuxtLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>