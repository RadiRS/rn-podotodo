import { ThemeVariables } from '@/config/theme/theme';
import { StyleSheet } from 'react-native';

const styles = (theme: ThemeVariables) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: theme.MetricsSizes.regular,
    },
  });

export default styles;
