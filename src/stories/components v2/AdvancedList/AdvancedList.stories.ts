import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesAdvancedListItemV2 from '@/components/common/AdvancedListItemV2/RcSesAdvancedListItemV2.vue'
import RcSesAdvancedListV2 from '@/components/common/AdvancedListV2/RcSesAdvancedListV2.vue'
import RcSesPriceDisplayV2 from '@/components/common/PriceDisplayV2/RcSesPriceDisplayV2.vue'
import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'
import RcSesRadioGroupV2 from '@/components/common/inputs/Radios/RadioGroupV2/RcSesRadioGroupV2.vue'
import RcSesRadioV2 from '@/components/common/inputs/Radios/RadioV2/RcSesRadioV2.vue'

const meta: Meta<typeof RcSesAdvancedListV2> = {
  title: 'componentsV2/AdvancedList',
  component: RcSesAdvancedListV2,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['card', 'row'],
      description: 'Card list uses gap; row list uses item dividers',
    },
    multiselectable: {
      control: 'boolean',
      description: 'Sets aria-multiselectable (also enables listbox role)',
    },
    listbox: {
      control: 'boolean',
      description: 'Sets role=listbox for selectable option children',
    },
    accessibleLabel: {
      control: 'text',
      description: 'Accessible name for the list',
    },
    framed: {
      control: 'boolean',
      description: 'Bordered panel surface (bg, border, padding)',
    },
    maxHeight: {
      control: 'text',
      description: 'Scrollable max height (e.g. 280 or 280px)',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesAdvancedListV2>

export const Default: Story = (args) => ({
  components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
  setup() {
    return { args }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2 v-bind="args">
            <RcSesAdvancedListItemV2
              :container="args.variant"
              title="First item"
              subtitle="Supporting text"
              :show-leading="false"
              :show-trailing="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            />
            <RcSesAdvancedListItemV2
              :container="args.variant"
              title="Second item"
              subtitle="Supporting text"
              :show-leading="false"
              :show-trailing="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            />
            <RcSesAdvancedListItemV2
              :container="args.variant"
              title="Third item"
              subtitle="Supporting text"
              :show-leading="false"
              :show-trailing="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            />
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})
Default.args = {
  variant: 'card',
  accessibleLabel: 'Example list',
  listbox: false,
  multiselectable: false,
  framed: false,
  maxHeight: undefined,
}

export const VariantCard: Story = (args) => ({
  components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
  setup() {
    return { args }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2 v-bind="args">
            <RcSesAdvancedListItemV2
              container="card"
              title="Card list item one"
              subtitle="Gap between bordered cards"
              :show-leading="false"
              :show-trailing="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            />
            <RcSesAdvancedListItemV2
              container="card"
              title="Card list item two"
              subtitle="Gap between bordered cards"
              :show-leading="false"
              :show-trailing="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            />
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})
VariantCard.args = {
  variant: 'card',
  accessibleLabel: 'Card list',
}

export const VariantRow: Story = (args) => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesPriceDisplayV2,
  },
  setup() {
    return { args }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2 v-bind="args">
            <RcSesAdvancedListItemV2
              container="row"
              title="Row list item one"
              subtitle="Dividers between rows"
              :show-leading="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            >
              <template #trailing>
                <RcSesPriceDisplayV2 price="12.00 €" label="VAT incl." />
              </template>
            </RcSesAdvancedListItemV2>
            <RcSesAdvancedListItemV2
              container="row"
              title="Row list item two"
              subtitle="Dividers between rows"
              :show-leading="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            >
              <template #trailing>
                <RcSesPriceDisplayV2 price="4.16 €" label="VAT incl." />
              </template>
            </RcSesAdvancedListItemV2>
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})
VariantRow.args = {
  variant: 'row',
  accessibleLabel: 'Row list',
}

export const MultiSelect: Story = (args) => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesCheckboxV2,
  },
  setup() {
    const items = [
      { id: 'a', title: 'Option A', subtitle: 'First choice' },
      { id: 'b', title: 'Option B', subtitle: 'Second choice' },
      { id: 'c', title: 'Option C', subtitle: 'Third choice' },
    ]
    const selectedIds = ref<string[]>(['a'])

    const toggle = (id: string) => {
      if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter((value) => value !== id)
        return
      }
      selectedIds.value = [...selectedIds.value, id]
    }

    return { args, items, selectedIds, toggle }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <p class="text-body-small-v2" style="margin-bottom: 12px;">
            Selected: {{ selectedIds.join(', ') || 'none' }}
          </p>
          <RcSesAdvancedListV2 v-bind="args">
            <RcSesAdvancedListItemV2
              v-for="item in items"
              :key="item.id"
              :container="args.variant"
              :title="item.title"
              :subtitle="item.subtitle"
              selectable
              :selected="selectedIds.includes(item.id)"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
              @select="toggle(item.id)"
            >
              <template #leading>
                <RcSesCheckboxV2
                  :model-value="selectedIds.includes(item.id)"
                  :show-label="false"
                  accessible-label="Select option"
                />
              </template>
            </RcSesAdvancedListItemV2>
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})
MultiSelect.args = {
  variant: 'card',
  accessibleLabel: 'Multi-select list',
  multiselectable: true,
}

export const SingleSelect: Story = (args) => ({
  components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
  setup() {
    const items = [
      { id: 'one', title: 'Option one', subtitle: 'Single choice list' },
      { id: 'two', title: 'Option two', subtitle: 'Single choice list' },
      { id: 'three', title: 'Option three', subtitle: 'Single choice list' },
    ]
    const selectedId = ref<string | null>('one')

    const select = (id: string) => {
      selectedId.value = id
    }

    return { args, items, selectedId, select }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <p class="text-body-small-v2" style="margin-bottom: 12px;">
            Selected: {{ selectedId || 'none' }}
          </p>
          <RcSesAdvancedListV2 v-bind="args">
            <RcSesAdvancedListItemV2
              v-for="item in items"
              :key="item.id"
              :container="args.variant"
              :title="item.title"
              :subtitle="item.subtitle"
              selectable
              :selected="selectedId === item.id"
              :show-leading="false"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
              @select="select(item.id)"
            />
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})
SingleSelect.args = {
  variant: 'card',
  accessibleLabel: 'Single-select list',
  listbox: true,
  multiselectable: false,
}

export const FramedScrollable: Story = (args) => ({
  components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
  setup() {
    const items = Array.from({ length: 8 }, (_, index) => ({
      id: `item-${index + 1}`,
      title: `Scrollable item ${index + 1}`,
      subtitle: 'Inside a framed panel with maxHeight',
    }))

    return { args, items }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2 v-bind="args">
            <RcSesAdvancedListItemV2
              v-for="item in items"
              :key="item.id"
              :container="args.variant"
              :title="item.title"
              :subtitle="item.subtitle"
              :show-leading="false"
              :show-trailing="false"
              :show-meta="false"
              :show-badge="false"
              :show-expanded="false"
            />
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})
FramedScrollable.args = {
  variant: 'card',
  accessibleLabel: 'Framed scrollable list',
  framed: true,
  maxHeight: 240,
}

export const NestedLevels: Story = () => ({
  components: {
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesCheckboxV2,
  },
  setup() {
    const selectedIds = ref<string[]>(['parent', 'child-a'])

    const isSelected = (id: string) => selectedIds.value.includes(id)

    const toggle = (id: string) => {
      if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter((value) => value !== id)
        return
      }
      selectedIds.value = [...selectedIds.value, id]
    }

    return { selectedIds, isSelected, toggle }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <RcSesAdvancedListV2
            framed
            :max-height="320"
            multiselectable
            accessible-label="Nested levels"
          >
            <RcSesAdvancedListItemV2
              title="Parent item"
              subtitle="Root level"
              selectable
              :selected="isSelected('parent')"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
              @select="toggle('parent')"
            >
              <template #leading>
                <RcSesCheckboxV2
                  :model-value="isSelected('parent')"
                  :show-label="false"
                  accessible-label="Parent"
                />
              </template>
            </RcSesAdvancedListItemV2>
            <RcSesAdvancedListItemV2
              :level="1"
              title="Child A"
              selectable
              :selected="isSelected('child-a')"
              :show-subtitle="false"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
              @select="toggle('child-a')"
            >
              <template #leading>
                <RcSesCheckboxV2
                  :model-value="isSelected('child-a')"
                  :show-label="false"
                  accessible-label="Child A"
                />
              </template>
            </RcSesAdvancedListItemV2>
            <RcSesAdvancedListItemV2
              :level="1"
              title="Child B"
              selectable
              :selected="isSelected('child-b')"
              :show-subtitle="false"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
              @select="toggle('child-b')"
            >
              <template #leading>
                <RcSesCheckboxV2
                  :model-value="isSelected('child-b')"
                  :show-label="false"
                  accessible-label="Child B"
                />
              </template>
            </RcSesAdvancedListItemV2>
            <RcSesAdvancedListItemV2
              :level="2"
              title="Grandchild"
              selectable
              :selected="isSelected('grandchild')"
              :show-subtitle="false"
              :show-meta="false"
              :show-badge="false"
              :show-trailing="false"
              :show-expanded="false"
              @select="toggle('grandchild')"
            >
              <template #leading>
                <RcSesCheckboxV2
                  :model-value="isSelected('grandchild')"
                  :show-label="false"
                  accessible-label="Grandchild"
                />
              </template>
            </RcSesAdvancedListItemV2>
          </RcSesAdvancedListV2>
        </div>
      </div>
    </div>
  `,
})

export const RadioSelection: Story = () => ({
  components: {
    RcSesRadioGroupV2,
    RcSesAdvancedListV2,
    RcSesAdvancedListItemV2,
    RcSesRadioV2,
  },
  setup() {
    const selectedId = ref('option-a')
    const items = [
      { id: 'option-a', title: 'Option A', subtitle: 'First choice' },
      { id: 'option-b', title: 'Option B', subtitle: 'Second choice' },
      { id: 'option-c', title: 'Option C', subtitle: 'Third choice' },
    ]

    return { selectedId, items }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <div class="advanced-list-story">
          <p class="text-body-small-v2" style="margin-bottom: 12px;">
            Selected: {{ selectedId }}
          </p>
          <RcSesRadioGroupV2 v-model="selectedId" accessible-label="Radio selection">
            <RcSesAdvancedListV2 accessible-label="Radio selection list">
              <RcSesAdvancedListItemV2
                v-for="item in items"
                :key="item.id"
                :title="item.title"
                :subtitle="item.subtitle"
                selectable
                :selected="selectedId === item.id"
                :show-trailing="false"
                @select="selectedId = item.id"
              >
                <template #leading>
                  <RcSesRadioV2
                    decorative
                    :value="item.id"
                    :show-label="false"
                    :accessible-label="item.title"
                  />
                </template>
              </RcSesAdvancedListItemV2>
            </RcSesAdvancedListV2>
          </RcSesRadioGroupV2>
        </div>
      </div>
    </div>
  `,
})
