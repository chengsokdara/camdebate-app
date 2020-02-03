import React, { useState } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity, View } from 'react-native'
import { RadioButton } from 'react-native-paper'

const Radio = ({
  accent,
  activeColor,
  inactiveColor,
  items,
  label,
  orientation = 'vertical',
  textColor,
  value,
  style,
  onChange,
  ...rest
}) => {
  const [innerValue, setInnerValue] = useState(value)

  const handleValueChanged = newValue => {
    setInnerValue(newValue)
    onChange && onChange(newValue)
  }

  return (
    <View style={style}>
      {label ? <Label>{label}</Label> : null}
      <RadioButton.Group
        style={{ flex: 0 }}
        value={innerValue}
        onValueChange={handleValueChanged}>
        <Content orientation={orientation}>
          {items.map((item, index) => (
            <Row key={index} orientation={orientation}>
              <RadioButton
                color={activeColor}
                uncheckColor={inactiveColor}
                value={item.value}
                {...rest}
              />
              <TouchableOpacity onPress={() => handleValueChanged(item.value)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            </Row>
          ))}
        </Content>
      </RadioButton.Group>
    </View>
  )
}

const Content = styled.View`
  align-self: flex-start;
  flex-direction: ${props =>
    props && props.orientation === 'horizontal' ? 'row' : 'column'};
`

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: ${props =>
    props && props.orientation === 'horizontal' ? 'center' : 'center'};
  justify-content: ${props =>
    props && props.orientation === 'horizontal' ? 'flex-start' : 'flex-start'};
`

const Text = styled.Text`
  color: #757575;
  margin-right: 10px;
`

export default Radio
