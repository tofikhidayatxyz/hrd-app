import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import { useEffect } from 'react'
import _ from 'lodash'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'

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

export default function ({
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

  useEffect(() => {
    if (value?.length) {
      form?.setFieldValue(name, value)
    }
  }, [value])

  return (
    <>
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
