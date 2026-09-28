import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getDrivers } from '../services/f1Service';
import SearchBar from '../components/SearchBar';
import { colors } from '../styles/colors';

export default function DriversScreen({ navigation }) {
  const [drivers, setDrivers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadDrivers = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDrivers();
  }, [loadDrivers]);

  const filteredDrivers = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return drivers;
    }

    return drivers.filter((driver) =>
      [
        driver.full_name,
        driver.first_name,
        driver.last_name,
        driver.name_acronym,
        driver.team_name,
        String(driver.driver_number),
      ].some((value) => String(value || '').toLowerCase().includes(term)),
    );
  }, [drivers, query]);

  const goToDetail = (driver) => {
    navigation.navigate('DriverDetail', { driver });
  };

  const renderCard = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => goToDetail(item)}
    >
      <View style={[styles.teamIndicator, { backgroundColor: `#${item.team_colour || 'E10600'}` }]} />

      {item.headshot_url ? (
        <Image source={{ uri: item.headshot_url }} style={styles.avatar} resizeMode="contain" />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={styles.avatarPlaceholderText}>{item.name_acronym || 'F1'}</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.full_name}
        </Text>
        <Text style={styles.cardMeta}>#{item.driver_number} • {item.name_acronym}</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText} numberOfLines={1}>
              {item.team_name}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          loading={false}
          placeholder="Buscar piloto ou equipe..."
        />
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.stateText}>Carregando pilotos...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={() => loadDrivers()}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredDrivers}
          keyExtractor={(item) => String(item.driver_number)}
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={() => loadDrivers(true)}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <Text style={styles.header}>
              {filteredDrivers.length} piloto(s) encontrado(s)
            </Text>
          }
          ListEmptyComponent={
            <View style={styles.centeredBox}>
              <Text style={styles.emptyTitle}>Nenhum piloto encontrado</Text>
              <Text style={styles.emptySubtitle}>
                Tente buscar pelo nome, número ou equipe.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchArea: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  centeredBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  stateText: {
    marginTop: 12,
    color: colors.textMuted,
    fontSize: 15,
  },
  errorText: {
    color: colors.danger,
    fontSize: 15,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  header: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  teamIndicator: {
    width: 5,
    height: '75%',
    borderRadius: 3,
    marginRight: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.secondary,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  cardMeta: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  tagRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  chevron: {
    marginLeft: 8,
  },
  chevronText: {
    fontSize: 30,
    color: colors.textMuted,
    fontWeight: '300',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
