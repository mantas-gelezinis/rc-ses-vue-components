<template>
  <div class="rc-ses-filter-dropdown-v2">
    <v-menu
      v-model="open"
      :close-on-content-click="false"
      :disabled="props.disabled"
      location="bottom"
      origin="auto"
      offset="4"
      :content-class="'rc-ses-filter-dropdown-v2__overlay'"
    >
      <template #activator="{ props: menuProps }">
        <button
          v-bind="menuProps"
          type="button"
          :class="triggerClasses"
          :disabled="props.disabled"
          :aria-expanded="open"
          :aria-controls="listId"
          aria-haspopup="listbox"
          :aria-label="triggerAriaLabel"
          @keydown="onTriggerKeydown"
        >
          <span class="rc-ses-filter-dropdown-v2__label">{{ props.label }}</span>

          <RcSesBadgeV2
            v-if="selectionCount > 0"
            class="rc-ses-filter-dropdown-v2__badge"
            type="brand"
            size="small"
            :show-icon="false"
            :ripple="false"
            :accessible-label="selectionCountLabel"
          >
            {{ selectionCount }}
          </RcSesBadgeV2>

          <span
            class="rc-ses-filter-dropdown-v2__caret"
            :class="{ 'rc-ses-filter-dropdown-v2__caret--open': open }"
            aria-hidden="true"
          >
            <v-icon icon="$caretDown" />
          </span>
        </button>
      </template>

      <div
        class="rc-ses-filter-dropdown-v2__panel"
        :style="panelStyle"
        @keydown="onPanelKeydown"
      >
        <ul
          :id="listId"
          class="rc-ses-filter-dropdown-v2__list"
          role="listbox"
          aria-multiselectable="true"
          :aria-label="props.label || props.accessibleLabel"
        >
          <!-- Keyboard navigation is handled on the trigger / listbox; tabindex follows activeIndex. -->
          <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/interactive-supports-focus, vuejs-accessibility/mouse-events-have-key-events -->
          <li
            v-for="(option, index) in props.options"
            :id="optionDomId(index)"
            :key="String(option.value)"
            :class="optionClasses(option, index)"
            role="option"
            :aria-selected="isSelected(option.value)"
            :aria-disabled="option.disabled || undefined"
            :tabindex="activeIndex === index ? 0 : -1"
            @click="toggleOption(option)"
            @mouseenter="activeIndex = index"
            @focusin="activeIndex = index"
          >
            <span class="rc-ses-filter-dropdown-v2__option-leading" @click.stop>
              <RcSesCheckboxV2
                :model-value="isSelected(option.value)"
                :show-label="false"
                :accessible-label="option.title"
                :disabled="option.disabled"
                @update:model-value="toggleOption(option)"
              />
            </span>
            <span class="rc-ses-filter-dropdown-v2__option-title">{{
              option.title
            }}</span>
          </li>

          <li
            v-if="(props.options?.length ?? 0) === 0"
            class="rc-ses-filter-dropdown-v2__empty"
            role="presentation"
          >
            {{ emptyText }}
          </li>
        </ul>
      </div>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'

import RcSesBadgeV2 from '@/components/common/BadgeV2/RcSesBadgeV2.vue'
import filterDropdownV2Defaults from '@/components/common/FilterDropdownV2/defaults'
import type {
  FilterDropdownOption,
  FilterDropdownProps,
  FilterDropdownValue,
} from '@/components/common/FilterDropdownV2/types'
import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'

import './style.scss'

const props = withDefaults(defineProps<FilterDropdownProps>(), filterDropdownV2Defaults)

const model = defineModel<FilterDropdownValue[]>({ default: () => [] })

const { t } = useTranslation()
const uid = getCurrentInstance()?.uid ?? 0
const listId = `rc-ses-filter-dropdown-v2-list-${uid}`

const open = ref(false)
const activeIndex = ref(-1)

const selectionCount = computed(() => model.value.length)

const selectionCountLabel = computed(() =>
  t('RcSesFilterDropdownV2.selectedCount', {
    ns: 'components',
    count: selectionCount.value,
  }),
)

const triggerAriaLabel = computed(() => props.accessibleLabel ?? props.label)

const emptyText = computed(() => t('RcSesFilterDropdownV2.empty', { ns: 'components' }))

const triggerClasses = computed(() => [
  'rc-ses-filter-dropdown-v2__trigger',
  {
    'rc-ses-filter-dropdown-v2__trigger--open': open.value,
    'rc-ses-filter-dropdown-v2__trigger--disabled': props.disabled,
  },
])

const panelStyle = computed(() => {
  const maxHeight =
    typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight

  return {
    '--rc-ses-filter-dropdown-v2-max-height': maxHeight,
  }
})

const optionDomId = (index: number) => `${listId}-option-${index}`

const isSelected = (value: FilterDropdownValue) => model.value.includes(value)

const optionClasses = (option: FilterDropdownOption, index: number) => [
  'rc-ses-filter-dropdown-v2__option',
  {
    'rc-ses-filter-dropdown-v2__option--active': activeIndex.value === index,
    'rc-ses-filter-dropdown-v2__option--disabled': option.disabled,
    'rc-ses-filter-dropdown-v2__option--selected': isSelected(option.value),
  },
]

const toggleOption = (option: FilterDropdownOption) => {
  if (option.disabled || props.disabled) {
    return
  }

  if (isSelected(option.value)) {
    model.value = model.value.filter((value) => value !== option.value)
    return
  }

  model.value = [...model.value, option.value]
}

const focusActiveOption = async () => {
  await nextTick()
  const option = props.options?.[activeIndex.value]
  if (!option) {
    return
  }

  document.getElementById(optionDomId(activeIndex.value))?.focus()
}

const openAndFocus = async (index = 0) => {
  open.value = true
  const total = props.options?.length ?? 0
  activeIndex.value = Math.min(index, Math.max(total - 1, 0))
  await focusActiveOption()
}

const moveActive = (delta: number) => {
  const options = props.options ?? []
  const total = options.length
  if (total === 0) {
    return
  }

  let next = activeIndex.value
  for (let step = 0; step < total; step += 1) {
    next = (next + delta + total) % total
    if (!options[next]?.disabled) {
      activeIndex.value = next
      focusActiveOption()
      return
    }
  }
}

const onTriggerKeydown = (event: KeyboardEvent) => {
  if (props.disabled) {
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!open.value) {
      openAndFocus(0)
      return
    }

    const option = props.options?.[activeIndex.value]
    if (option) {
      toggleOption(option)
    }
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!open.value) {
      openAndFocus(0)
      return
    }

    moveActive(1)
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!open.value) {
      openAndFocus((props.options?.length ?? 1) - 1)
      return
    }

    moveActive(-1)
  }

  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    open.value = false
  }
}

const onPanelKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActive(1)
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActive(-1)
  }

  if (event.key === 'Enter' || event.key === ' ') {
    const option = props.options?.[activeIndex.value]
    if (option) {
      event.preventDefault()
      toggleOption(option)
    }
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    open.value = false
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    activeIndex.value = 0
    return
  }

  activeIndex.value = -1
})
</script>
