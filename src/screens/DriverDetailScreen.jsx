import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../styles/colors';

function InfoRow({ label, value }) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{String(value)}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export default function DriverDetailScreen({ route }) {
  const { driver } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        {driver.headshot_url ? (
          <Image
            source={{ uri: driver.headshot_url }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroPlaceholderText}>{driver.name_acronym}</Text>
          </View>
        )}
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.name}>{driver.full_name}</Text>
        <View style={styles.chipsRow}>
          <View style={styles.titleChip}>
            <Text style={styles.titleChipText}>#{driver.driver_number}</Text>
          </View>
          <View style={[styles.titleChip, styles.titleChipAlt]}>
            <Text style={styles.titleChipText}>{driver.name_acronym}</Text>
          </View>
        </View>
      </View>

      <Section title="Informações do piloto">
        <InfoRow label="Nome completo" value={driver.full_name} />
        <InfoRow label="Nome de transmissão" value={driver.broadcast_name} />
        <InfoRow label="Nome" value={driver.first_name} />
        <InfoRow label="Sobrenome" value={driver.last_name} />
        <InfoRow label="Número" value={`#${driver.driver_number}`} />
      </Section>

      <Section title="Equipe">
        <InfoRow label="Equipe" value={driver.team_name} />
        <InfoRow label="Cor da equipe" value={`#${driver.team_colour}`} />
      </Section>

      <Section title="Dados da sessão">
        <InfoRow label="Meeting key" value={driver.meeting_key} />
        <InfoRow label="Session key" value={driver.session_key} />
        <InfoRow label="Código do país" value={driver.country_code || 'Não informado'} />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  hero: {
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 280,
    borderRadius: 18,
    backgroundColor: colors.secondary,
  },
  heroPlaceholder: {
    height: 280,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    fontSize: 72,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  titleBlock: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  titleChip: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  titleChipAlt: {
    backgroundColor: colors.primaryLight,
  },
  titleChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 16,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionAccent: {
    width: 6,
    height: 20,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  infoLabel: {
    width: '42%',
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    textAlign: 'right',
  },
});
