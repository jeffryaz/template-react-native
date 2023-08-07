import I18n from 'react-native-i18n';
import { id, en } from './locales/index';

export const resources = {
    id,
    en,
};
I18n.fallbacks = true;
I18n.translations = resources;

export default I18n;