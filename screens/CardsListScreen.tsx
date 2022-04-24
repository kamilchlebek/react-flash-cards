import { RootStackScreenProps } from '../types'
import {
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  Modal,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import BigList from 'react-native-big-list'
import { useRef, useState } from 'react'

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />
const SearchIcon = (props: any) => <Icon {...props} name="search" />

const getItem = (index: any) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item${index + 1}`,
})

const DATA: any = new Array(500).fill(1).map((_, index) => getItem(index))
const ITEM_HEIGHT = 60

const SearchModal = ({
  visible,
  onSearch,
  onCancel,
}: {
  visible: boolean
  onSearch: (query: string) => void
  onCancel: () => void
}) => {
  const [query, setQuery] = useState('')

  const onSearchPress = () => {
    onSearch(query)
  }

  const onBackDropPress = () => {
    onCancel()
  }

  const onCancelPress = () => {
    onCancel()
  }

  return (
    <Modal visible={visible} backdropStyle={modalStyles.backdrop} onBackdropPress={onBackDropPress}>
      <Card disabled={true}>
        <Text category="s1">Szukaj...</Text>
        <Input
          style={modalStyles.input}
          value={query}
          onChangeText={(nextValue) => setQuery(nextValue)}
        />
        <View style={modalStyles.actionContainer}>
          <Button appearance="ghost" onPress={onCancelPress}>
            Anuluj
          </Button>
          <Button onPress={onSearchPress}>Szukaj</Button>
        </View>
      </Card>
    </Modal>
  )
}

const modalStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    marginVertical: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function CardsListScreen({ navigation }: RootStackScreenProps<'CardsList'>) {
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const list = useRef<any>(null)
  const styles = useStyleSheet(themedStyles);

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.replace('Home')} />
  )
  const renderSearchAction = () => (
    <TopNavigationAction
      icon={SearchIcon}
      onPress={() => {
        setSearchModalVisible(true)
        // @TODO: @kamil display modal with input
        // @TODO: @kamil scroll to desired card
      }}
    />
  )


  const Item = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title2}>{item.title}</Text>
      </View>
    )
  }

  const renderItem = ({ item, index }: any) => {
    return <Item item={item} />
  }

  return (
    <>
      <SearchModal
        visible={searchModalVisible}
        onSearch={(query) => {
          setSearchModalVisible(false)

          const index = DATA.findIndex((i: any) => i.title.includes(query))
          if (index) {
            list.current.scrollToIndex({ index })
          }
        }}
        onCancel={() => setSearchModalVisible(false)}
      ></SearchModal>
      <TopNavigation
        title="Fiszki"
        alignment="center"
        accessoryLeft={renderBackAction}
        accessoryRight={renderSearchAction}
      />
      <Divider />
      <Layout style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <BigList
            ref={list}
            data={DATA}
            renderItem={renderItem}
            itemHeight={ITEM_HEIGHT}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </Layout>
    </>
  )
}

const themedStyles = StyleService.create({
  item: {
    display: 'flex',
    flexFlow: 'row',
    height: ITEM_HEIGHT,
    padding: 5,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'border-basic-color-5',
  },
  title: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  title2: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: 'border-basic-color-5',
  },
})
