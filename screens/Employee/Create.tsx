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
import Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { createEmployee } from '../../services/actions/employee'

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

export default function EmployeeCreate({ navigation }: any) {
  const [avatar, setAvatar] = useState()
  const createStatus = useSelector((state: any) => state.employee.create)
  const Dispatch = useDispatch()
  const [form, setForm] = useReducer(
    (oldState: any, newState: any) => ({ ...oldState, ...newState }),
    {
      nip: 'Triad',
      name: 'Noda',
      gender: 'male',
      religion: 'islam',
      address: 'Sukamaju',
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
    return Object.entries(form).filter((c: any) => c[1]?.length).length >= 5
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
    formData.append('nip', form.nip)
    formData.append('name', form.name)
    formData.append('gender', form.gender)
    formData.append('religion', form.religion)
    formData.append('address', form.address)
    formData.append('avatar', {
      uri,
      name: `image.${ext}`,
      type,
    })
    Dispatch(createEmployee(formData))
  }, [form])

  return (
    <SafeAreaView>
      <Appbar.Header style={style.header}>
        <Appbar.BackAction
          onPress={() => navigation.navigate('employee.index')}
          color={scheme.primary}
        />
        <Appbar.Content title="Create New Employee" />
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
          label="NIP"
          value={form.nip}
          onChangeText={(text) => setForm({ nip: text })}
        />
        {createStatus.data?.nip?.[0] && (
          <Text style={style.error}>{createStatus.data?.nip?.[0]}</Text>
        )}
        <TextInput
          mode="outlined"
          label="Name"
          value={form.name}
          onChangeText={(text) => setForm({ name: text })}
        />
        {createStatus.data?.name?.[0] && (
          <Text style={style.error}>{createStatus.data?.name?.[0]}</Text>
        )}
        <PaperSelect
          label="Religion"
          textInputMode="outlined"
          value={form.religion}
          onSelection={(value) => setForm({ religion: value.text })}
          arrayList={religion}
          hideSearchBox
          theme={theme}
          selectedArrayList={[]}
        />

        {createStatus.data?.religion?.[0] && (
          <Text style={style.error}>{createStatus.data?.religion?.[0]}</Text>
        )}

        <Text style={style.label}>Gender</Text>
        <View style={style.rowSelect}>
          <View style={style.colSelect}>
            <RadioButton
              value="male"
              status={form.gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setForm({ gender: 'male' })}
            />
            <Text>Male</Text>
          </View>
          <View style={style.colSelect}>
            <RadioButton
              value="female"
              status={form.gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setForm({ gender: 'female' })}
            />
            <Text>Female</Text>
          </View>
        </View>
        {createStatus.data?.gender?.[0] && (
          <Text style={style.error}>{createStatus.data?.gender?.[0]}</Text>
        )}
        <TextInput
          mode="outlined"
          label="Address"
          multiline={true}
          style={{ height: 100 }}
          value={form.address}
          onChangeText={(text) => setForm({ address: text })}
        />
        {createStatus.data?.Address?.[0] && (
          <Text style={style.error}>{createStatus.data?.Address?.[0]}</Text>
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
