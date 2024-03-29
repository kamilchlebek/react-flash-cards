import { useAddDeckMutation } from '../../data/homeApi'
import { LoadingIndicator } from '../../../../shared/LoadingIndicator'
import { Button, Card, Input, Modal, Text } from '@ui-kitten/components'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

export const AddDeckModal = ({
  onAddCancel,
  onAddSuccess,
}: {
  onAddCancel: () => void
  onAddSuccess: () => void
}) => {
  const [newDeckName, setNewDeckName] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [addDeck, { isLoading, isSuccess }] = useAddDeckMutation()

  const onSavePress = () => {
    if (isLoading) {
      return
    }

    setFormSubmitted(true)
    if (newDeckName) {
      addDeck({
        name: newDeckName,
      })
        .unwrap()
        .then(() => {
          onAddSuccess()
        })
    }
  }

  const onBackDropPress = () => {
    if (isLoading) {
      return
    }
    onAddCancel()
  }

  const onCancelPress = () => {
    if (isLoading) {
      return
    }
    onAddCancel()
  }

  return (
    <Modal
      visible={true}
      style={{ width: 300 }}
      backdropStyle={modalStyles.backdrop}
      onBackdropPress={onBackDropPress}
    >
      <Card disabled={true}>
        <Text category="s1">Dodaj talię kart</Text>
        <Input
          status={formSubmitted && !newDeckName ? 'danger' : 'basic'}
          style={modalStyles.input}
          value={newDeckName}
          placeholder="Podaj nazwę nowej talii"
          onChangeText={(nextValue) => setNewDeckName(nextValue)}
        />
        <View style={modalStyles.actionContainer}>
          {isLoading ? <LoadingIndicator /> : undefined}
          <Button appearance="ghost" onPress={onCancelPress}>
            Anuluj
          </Button>
          <Button onPress={onSavePress}>Zapisz</Button>
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
})
