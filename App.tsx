/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import KeepAwake from 'react-native-keep-awake';
import { Provider } from 'react-redux';
import { persistor, store } from './app/config/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import I18n from './app/config/i18n';
import { keys, findIndex } from 'lodash';
import { resources } from './app/config/i18n/index';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [languageChanged, setLanguageChanged] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    KeepAwake.activate();
    const init = async () => {
    }

    init();
    cekLanguage();

    return () => {

    }
  }, [])

  const cekLanguage = (): void => {
    const propertyNames = keys(resources);
    const findDefaultLanguage = findIndex(propertyNames, (e) => {
      return e === I18n.currentLocale().split("-")[0];
    }, 0)
    if (findDefaultLanguage === -1) {
      I18n.locale = 'en';
      setLanguageChanged(!languageChanged);
    } else {
      I18n.locale = propertyNames[findDefaultLanguage];
      console.log('I18n.currentLocale()-1', I18n.currentLocale());
    }
  }

  const changeLanguage = (): void => {
    I18n.locale = I18n.currentLocale() === 'en' ? 'id' : 'en';
    setLanguageChanged(!languageChanged);
  }


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <Header />
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <Section title="Step One">
                Edit <Text style={styles.highlight} onPress={changeLanguage}>App.tsx</Text> to change {I18n.t('SELECT_A_LANGUAGE')}.
              </Section>
              <Section title="See Your Changes">
                <ReloadInstructions />
              </Section>
              <Section title="Debug">
                <DebugInstructions />
              </Section>
              <Section title="Learn More">
                Read the docs to discover what to do next:
              </Section>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
