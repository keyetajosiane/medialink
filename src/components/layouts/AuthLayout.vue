<template>
    <div class="flex h-screen bg-gray-900 text-white">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main container -->
        <div class="flex-1 flex flex-col">
            <!-- Navbar -->
            <Navbar />

            <!-- Main content area -->
            <main class="flex-1 overflow-y-auto p-4">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
</script>

<style>
/* Global styles or additional styles can go here */
</style>