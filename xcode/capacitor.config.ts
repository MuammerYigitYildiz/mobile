import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'xcode',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  }
};

export default config;
