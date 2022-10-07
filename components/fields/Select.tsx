import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import _ from 'lodash'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import BottomSheet from '@gorhom/bottom-sheet'
import Button from './Button'

interface InputInterface {
  label?: string | null
  name?: string
  type?: string
  form?: any
  disabled?: boolean
  withError?: boolean
  placeholder?: string
  value?: any
  inputStyle?: any
  secure?: boolean
  style?: any
  labelStyle?: any
  errorStyle?: any
  onChange?: Function
  hasError?: boolean | null
}

export default function SelectField({
  label = null,
  name = 'input-name',
  type,
  form,
  disabled,
  withError = false,
  placeholder = '',
  value = null,
  inputStyle = 'normal',
  secure = false,
  style = {},
  labelStyle = {},
  errorStyle = {},
  onChange = () => {},
  hasError = false,
}: InputInterface) {
  const error = form?.errors[name]
  const touched = form?.touched[name]
  const [focus, setFocus] = useState(false)
  const [hasSecure, setSecure] = useState(secure)
  const [selectedLanguage, setSelectedLanguage] = useState()
  const sheetRef = useRef<BottomSheet>(null)

  useEffect(() => {
    if (value?.length) {
      form?.setFieldValue(name, value)
    }
  }, [value])
  const snapPoints = useMemo(() => ['25%', '50%'], [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  return (
    <>
      <Button title="Close Sheet" onPress={() => sheetRef.current.expand()} />
      {/* <Picker
        selectedValue={selectedLanguage}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}
      <View style={styles.formGroup}>
        {label && <Text style={styles.label}>{label}</Text>}

        <TextInput
          placeholder={placeholder}
          onChangeText={(newText) => {
            form?.setFieldValue(name, newText)
            onChange(newText)
          }}
          defaultValue={value}
          value={value || (form?.values && form?.values[name]) || ''}
          secureTextEntry={hasSecure}
          onFocus={() => {
            setFocus(true)
            form?.setFieldTouched(name, true)
          }}
          onBlur={() => {
            setFocus(false)
            form?.handleBlur(name)
          }}
          style={{
            ...styles.input,
            ...((error && withError && touched) || hasError
              ? styles.inputError
              : {}),
            ...(secure
              ? {
                  paddingRight: 40,
                }
              : {}),
            ...(focus ? styles.inputFocus : {}),
          }}
        />

        {secure && (
          <TouchableOpacity
            style={styles.viewEye}
            onPress={() => setSecure(!hasSecure)}
          >
            <FontAwesome
              name={hasSecure ? 'eye-slash' : 'eye'}
              size={18}
              color={
                error && withError && touched && hasError
                  ? '#F44336'
                  : '#A0A3AF'
              }
            />
          </TouchableOpacity>
        )}

        {((error && withError && touched) || hasError) && (
          <Text style={styles.error}>
            {hasError ? hasError : error ? _.upperFirst(error) : ''}
          </Text>
        )}
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
        bottomInset={10}
        // topInset={}
      >
        <View>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  formGroup: {
    paddingVertical: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginTop: 10,
    marginBottom: 4,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
    // placeholderTextColor: '#A0A3AF',
  },
  label: {
    color: '#A0A3AF',
  },
  inputError: {
    borderColor: '#F44336',
  },
  inputFocus: {
    borderColor: '#FBA52D',
  },
  error: {
    color: '#F44336',
    fontSize: 12,
  },
  viewEye: {
    position: 'absolute',
    top: 42,
    right: 10,
  },
})
