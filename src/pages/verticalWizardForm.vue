<template>
  <RcSesHeader
    drop-shadow
    :breadcrumbs="[
      {
        title: 'Pradžia',
        href: '/',
      },
      {
        title: 'Vertikalios formos su vedliu pavyzdys',
      },
    ]"
    title="Vertikalios formos su vedliu pavyzdys"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  >
  </RcSesHeader>
  <VerticalWizardForm />
</template>

<script setup lang="ts">
import RcSesHeader from '@/components/layouts/Header/RcSesHeader.vue'
import VerticalWizardForm from '@/examples/CardFormWizard/VerticalWizardForm.vue'
</script>
