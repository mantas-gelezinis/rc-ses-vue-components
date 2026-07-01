import i18next from 'i18next'

import CookieStorage from '@/shared/CookieStorage'

const i18n = () => {
  const storage = new CookieStorage()

  i18next.init({
    lng:
      storage.getItem(window.ENV?.ENV_LANGUAGE_COOKIE_NAME) ??
      window.ENV?.ENV_FRONTEND_DEFAULT_LANG ??
      'lt',
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: 'lt',
    resources: {
      lt: {
        components: {
          RcSesDatePicker: {
            close: 'Uždaryti',
            openCalendar: 'Atverti datos pasirinkimo kalendorių',
            previousMonth: 'Praėjęs mėnuo',
            thisWeek: 'Ši savaitė',
            thisMonth: 'Šis mėnuo',
          },

          RcSesFileDropzone: {
            label: 'Nutempkite failą čia arba įkelkite iš kompiuterio',
          },

          RcSesFileInput: {
            label: 'Įkelti failą',
          },

          RcSesSearchableArea: {
            placeholder: 'Ieškoti',
          },

          RcSesSelectField: {
            noData: 'Nėra duomenų',
          },

          RcSesBadgeV2: {
            remove: 'Pašalinti',
          },

          RcSesCardV2: {
            back: 'Grįžti',
            cancel: 'Atšaukti',
            continue: 'Tęsti',
            pay: 'Apmokėti',
            priceBeforeTaxes: 'Suma be PVM:',
          },
        },
      },
      en: {
        components: {
          RcSesDatePicker: {
            close: 'Close',
            openCalendar: 'Open datepicker calendar',
            previousMonth: 'Previous month',
            thisWeek: 'This week',
            thisMonth: 'This month',
          },

          RcSesFileDropzone: {
            label: 'Drag and drop file over this area or click here to browse',
          },

          RcSesFileInput: {
            label: 'Upload file',
          },

          RcSesSearchableArea: {
            placeholder: 'Search',
          },

          RcSesSelectField: {
            noData: 'No results',
          },

          RcSesBadgeV2: {
            remove: 'Remove',
          },

          RcSesCardV2: {
            back: 'Back',
            cancel: 'Cancel',
            continue: 'Continue',
            pay: 'Pay',
            priceBeforeTaxes: 'Amount excl. VAT:',
          },
        },
      },
    },
  })

  return { i18next }
}

export default i18n
