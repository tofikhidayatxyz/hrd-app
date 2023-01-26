import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
} from 'react-native'
import moment from 'moment'
import authStyle from '../../styles/Auth'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import * as Yup from 'yup'
import Form from '../../components/fields/Form'
import * as ImagePicker from 'expo-image-picker'
import InputField from '../../components/fields/Input'
import { PaperSelect } from 'react-native-paper-select'
import colors from '../../constants/Colors'
import {
  Appbar,
  Avatar,
  Button,
  IconButton,
  RadioButton,
  TextInput,
} from 'react-native-paper'
import { StyleSheet, Dimensions } from 'react-native'
import color from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { createDeveloper } from '../../services/actions/developer'

const scheme = color.light

const style = StyleSheet.create<any>({
  wrapper: {
    // backgroundColor: scheme.secondary,
    // innerHeight: '100%',
    // flex: 1,
    padding: 10,
  },
  rowSelect: {
    flexDirection: 'row',
  },
  colSelect: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  save: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingTop: 30,
  },
  error: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
})

const religion = [
  { _id: '1', value: 'Islam' },
  { _id: '2', value: 'Christian' },
  { _id: '3', value: 'Budha' },
  { _id: '5', value: 'Hindu' },
]

export default function DeveloperCreate({ navigation }: any) {
  const [avatar, setAvatar] = useState()
  const createStatus = useSelector((state: any) => state.developer.create)
  const Dispatch = useDispatch()
  const [form, setForm] = useReducer(
    (oldState: any, newState: any) => ({ ...oldState, ...newState }),
    {
      nip: '',
      name: '',
      gender: 'male',
      email: '',
      phone: '',
      avatar: '',
    }
  )

  const handlePickImage = useCallback(() => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then(async (result: any) => {
        if (result) {
          setAvatar(result.uri)
          setForm({
            avatar: result.uri,
          })
        }
      })
      .catch(console.log)
  }, [])

  const isValid = useMemo(() => {
    return Object.entries(form).filter((c: any) => c[1]?.length).length >= 2
  }, [form])

  const handleSubmit = useCallback(() => {
    const uri =
      Platform.OS === 'android'
        ? form.avatar
        : form.avatar.replace('file://', '')
    const filename = form.avatar.split('/').pop()
    const match = /\.(\w+)$/.exec(filename as string)
    const ext = match?.[1]
    const type = match ? `image/${match[1]}` : `image`

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('avatar', {
      uri,
      name: `image.${ext}`,
      type,
    })
    Dispatch(createDeveloper(formData))
  }, [form])

  return (
    <SafeAreaView>
      <Appbar.Header style={style.header}>
        <Appbar.BackAction
          onPress={() => navigation.navigate('developer.index')}
          color={scheme.primary}
        />
        <Appbar.Content title="Create New Developer" />
      </Appbar.Header>

      <View style={style.avatar}>
        <TouchableWithoutFeedback onPress={handlePickImage}>
          <Avatar.Image
            size={60}
            source={
              avatar ? { uri: avatar } : require('../../assets/images/user.png')
            }
          />
        </TouchableWithoutFeedback>
        {createStatus.data?.avatar?.[0] && (
          <Text style={style.error}>{createStatus.data?.avatar?.[0]}</Text>
        )}
      </View>

      <View style={style.wrapper}>
        <TextInput
          mode="outlined"
          label="Name"
          value={form.name}
          onChangeText={(text) => setForm({ name: text })}
        />
        {createStatus.data?.name?.[0] && (
          <Text style={style.error}>{createStatus.data?.name?.[0]}</Text>
        )}
        <TextInput
          mode="outlined"
          label="Email"
          value={form.email}
          onChangeText={(text) => setForm({ email: text })}
        />
        {createStatus.data?.email?.[0] && (
          <Text style={style.error}>{createStatus.data?.email?.[0]}</Text>
        )}
      </View>
      <View style={style.save}>
        <Button
          mode="contained"
          disabled={!isValid || !form.avatar}
          onPress={handleSubmit}
          style={{ borderRadius: 4 }}
        >
          Save
        </Button>
      </View>
    </SafeAreaView>
  )
}
