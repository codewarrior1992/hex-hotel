import Vue from 'vue';
import VueI18n from 'vue-i18n';

import EN_customized  from '@/assets/js/i18n/en.js';
import ZH_customized  from '@/assets/js/i18n/zh.js';
import JA_customized  from '@/assets/js/i18n/ja.js';

Vue.use(VueI18n);
const locale = localStorage.getItem('locale') || 'en-US';
const numberFormats = {
    'zh-TW': {
        currency: {
        style: 'currency',
        currency: 'TWD',
        currencyDisplay: 'symbol'
        }
    },
    'en-US': {
        currency: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
        }
    },
    'ja-JP': {
        currency: {
        style: 'currency',
        currency: 'JPY',
        currencyDisplay: 'symbol'
        }
    }
}

const i18n = new VueI18n({
    locale,
    messages : {
        'zh-TW': ZH_customized,
        'en-US': EN_customized,
        'ja-JP': JA_customized,
    },
    numberFormats
})

export { i18n }