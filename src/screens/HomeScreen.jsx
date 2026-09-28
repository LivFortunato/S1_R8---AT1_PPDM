import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.circle, styles.circleTop]} />
      <View style={[styles.circle, styles.circleBottom]} />

      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Text style={styles.logo}>F1</Text>
        </View>

        <Text style={styles.title}>F1 Drivers</Text>

        <Text style={styles.description}>
          Consulte os pilotos da Fórmula 1 e veja informações sobre nomes, números e equipes a
          partir de dados da OpenF1 API.
        </Text>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => navigation.navigate('Pilotos')}
        >
          <Text style={styles.buttonText}>Acessar pilotos</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    backgroundColor: colors.surfaceALT,
    borderRadius: 999,
  },
  circleTop: {
    width: 280,
    height: 280,
    top: -110,
    right: -90,
    opacity: 0.7,
  },
  circleBottom: {
    width: 260,
    height: 260,
    bottom: -100,
    left: -90,
    opacity: 0.6,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoCircle: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: colors.primary,
    borderWidth: 5,
    borderColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  logo: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.white,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.primaryDark,
    letterSpacing: 1,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 30,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
  },
  buttonArrow: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 10,
  },
});
