<script setup lang="ts">
import { loadRemoteModule } from "@softarc/native-federation";
import { defineAsyncComponent } from "vue";

const RemoteComponent: any = defineAsyncComponent(async () => loadRemoteModule("remote-app", "./Header"));
</script>

<template>
    <div>
        <RemoteComponent v-if="!!RemoteComponent" />
    </div>
</template>