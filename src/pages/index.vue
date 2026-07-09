<template>
  <RcSesHeader
    drop-shadow
    :breadcrumbs="['Pradžia', 'Pavyzdžiai']"
    title="Formų bei komponentų pavyzdžiai"
    description="Formos ir komponentai yra esminės bet kokios vartotojo sąsajos dalys, kurios padeda kurti sąveiką tarp vartotojo ir programos. Formos yra struktūrizuoti laukai, skirti duomenų įvedimui, pavyzdžiui, prisijungimo vardai, slaptažodžiai ar atsiliepimai. Jos gali būti paprastos, su keletu teksto laukų, arba sudėtingos, apimantys įvairias parinktis, tokias kaip išskleidžiami sąrašai ar radijo mygtukai. Komponentai yra pakartotinai naudojami UI elementai, tokie kaip mygtukai, etiketės, perjungikliai ir slankikliai, kurie padeda standartizuoti ir optimizuoti vartotojo sąsajos kūrimą. Kartu šie elementai formuoja naudotojui draugiškas sąsajas, leidžiančias efektyviai ir patogiai bendrauti su programinės įrangos funkcijomis."
  >
  </RcSesHeader>
  <v-container class="rc-container">
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.value"
        append-icon="$next"
        :to="item.routeTo"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list>
      <v-list-item append-icon="$next" @click="showSuccessModal = true">
        <v-list-item-title>Modalas: Sėkmingai atlikto veiksmo pavyzdys</v-list-item-title>
      </v-list-item>
      <v-list-item append-icon="$next" @click="showCancelModal = true">
        <v-list-item-title>Modalas: Darbo užbaigimo pavyzdys</v-list-item-title>
      </v-list-item>
    </v-list>

    <SuccessModal v-model="showSuccessModal" />
    <CancelModal v-model="showCancelModal" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import RcSesHeader from '@/components/layouts/Header/RcSesHeader.vue'
import CancelModal from '@/examples/modals/CancelModal.vue'
import SuccessModal from '@/examples/modals/SuccessModal.vue'

const showSuccessModal = ref(false)
const showCancelModal = ref(false)

const items = ref([
  {
    title: 'Vienos formos pavyzdys',
    value: 1,
    routeTo: '/singleForm',
  },
  {
    title: 'Kelių formų pavyzdys',
    value: 2,
    routeTo: '/multiForm',
  },
  {
    title: 'Skirtuko tipo formos pavyzdys',
    value: 3,
    routeTo: '/tabForm',
  },
  {
    title: 'Duomenų lentelės pavyzdys',
    value: 4,
    routeTo: '/dataTable',
  },
  {
    title: 'Horizontalios formos su vedliu pavyzdys',
    value: 5,
    routeTo: '/horizontalWizardForm',
  },
  {
    title: 'Vertikalios formos su vedliu pavyzdys',
    value: 6,
    routeTo: '/verticalWizardForm',
  },
])
</script>
