import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';
import { createTransform } from 'redux-persist';

const encrypt = createTransform(
    (inboundState: any, key) => {
        if (!inboundState) return inboundState;
        const cryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState), 'indonesia-jaya-jaya');

        return cryptedText.toString();
    },
    (outboundState: any, key) => {
        if (!outboundState) return outboundState;
        const bytes = CryptoJS.AES.decrypt(outboundState, 'indonesia-jaya-jaya');
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
    },
);

const rootPersist = {
    active: true,
    reducerVersion: "1.0",
    storeConfig: {
        key: "templateReactNative",
        storage: AsyncStorage,
        whitelist: ['layout'],
        transforms: [encrypt],
    },
};

export default rootPersist;
