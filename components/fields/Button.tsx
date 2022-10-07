import { TouchableOpacity, StyleSheet, Text, Button } from 'react-native'

interface ButtonInterface {
  children?: any
  text?: string
  onPress?: Function
  style?: any
  textStyle?: any
  disabled?: boolean
  onLongPress?: Function
  color?: string
  background?: string
}

export default function ({
  children,
  text,
  color = '#fff',
  background = '#FBA52D',
  style = {},
  textStyle = {},
  onPress = () => {},
  onLongPress = () => {},
}: ButtonInterface) {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ ...styles.button, backgroundColor: background, ...style }}
    >
      {text ? (
        <Text style={{ ...styles.text, color, ...textStyle }}>{text}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 4,
    flex: 0,
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
})
