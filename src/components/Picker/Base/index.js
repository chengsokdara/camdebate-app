import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Modal, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper'

import { primaryColor } from '../../../resources'

const Picker = ({
  items = [
    {
      label: '',
      value: ''
    },
    {
      label: 'Cambodia',
      value: 'cambodia'
    },
    {
      label: 'Thailand',
      value: 'thailand'
    },
    {
      label: 'Singapore',
      value: 'singapore'
    },
    {
      label: 'Taiwan',
      value: 'taiw'
    }
  ],
  onChangeValue,
  ...rest
}) => {
  const inputRef = useRef()
  const [inputText, setInputText] = useState('')
  const [visible, setVisible] = useState(false)

  console.log('inputText', inputText)

  const _toggleMenu = () => setVisible(!visible)

  const _closeMenu = (label, value) => {
    onChangeValue && onChangeValue(value)
    console.log('label', label)
    setInputText(label)
    setVisible(false)
  }

  // const filteredItems = items.filter(item =>
  //   item.label.toLowerCase().startsWith(inputText.toLowerCase())
  // )

  return (
    <Container>
      <ContainerInput
        activeOpacity={0.75}
        underlayColor={primaryColor}
        style={{ borderRadius: 10 }}
        onPress={_toggleMenu}>
        <TextInput
          ref={inputRef}
          editable={false}
          label="Select country"
          mode="outlined"
          value={inputText}
          onChangeText={text => {
            setVisible(true)
            setInputText(text)
          }}
          {...rest}
        />
        <ButtonIcon onPress={_toggleMenu}>
          <Icon name="chevron-down-circle" size={24} color={primaryColor} />
        </ButtonIcon>
      </ContainerInput>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={_toggleMenu}>
        <Overlay activeOpacity={1} onPress={_toggleMenu}>
          <ContainerItem>
            <Label bgColor={primaryColor}>Select country</Label>
            <ScrollView
              contentContainerStyle={{
                padding: 10
              }}>
              {items.map(({ label, value }) => (
                <Item key={value} onPress={() => _closeMenu(label, value)}>
                  <Text>{label || 'None'}</Text>
                </Item>
              ))}
            </ScrollView>
          </ContainerItem>
        </Overlay>
      </Modal>
    </Container>
  )
}

const ButtonIcon = styled.TouchableOpacity`
  position: absolute;
  top: 22px;
  right: 10px;
`

const Container = styled.View`
  flex: 1;
`

const ContainerInput = styled.TouchableOpacity``

const ContainerItem = styled.View`
  width: 100%;
  border-radius: 10px;
  background-color: white;
`

const Item = styled.TouchableOpacity`
  padding: 10px;
`

const Label = styled.Text`
  color: white;
  font-size: 20px;
  padding: 15px;
  background-color: ${props => (props.bgColor ? props.bgColor : 'transparent')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const Overlay = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #00000040;
`

const Text = styled.Text`
  color: #757575;
  font-size: 16px;
`

export default Picker
