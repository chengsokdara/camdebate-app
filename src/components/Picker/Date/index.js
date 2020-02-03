import React, { useRef, useState } from 'react'
import RNDatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

import { primaryColor } from '../../../resources'

const DatePicker = ({
  label = 'Date of Birth',
  onChangeValue,
  style,
  ...rest
}) => {
  const dateRef = useRef()
  const [dateText, setDateText] = useState('2000-01-01')

  const _openDatePicker = () => dateRef.current.onPressDate()

  return (
    <>
      <Container
        style={[
          {
            height: 56,
            marginTop: 7,
            borderRadius: 10,
            backgroundColor: '#f5f5f5'
          },
          style
        ]}>
        <RNDatePicker
          ref={dateRef}
          style={{
            width: '100%',
            height: 56,
            marginTop: 8
          }}
          date={dateText}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate="2100-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateInput: {
              height: 57,
              borderColor: '#757575',
              borderRadius: 10,
              paddingHorizontal: 10,
              alignItems: 'flex-start'
            },
            dateText: {
              color: '#757575',
              fontSize: 16
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            setDateText(date)
          }}
        />
        <Label>{label}</Label>
        <ChevronDownIcon
          name="chevron-down-circle"
          size={24}
          color={primaryColor}
          onPress={_openDatePicker}
        />
      </Container>
    </>
  )
}

const Container = styled.View`
  flex: 1;
`

const ChevronDownIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 10px;
`

const Label = styled.Text`
  position: absolute;
  top: -8px;
  left: 10px;
  color: #757575;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #f5f5f5;
`

export default DatePicker
