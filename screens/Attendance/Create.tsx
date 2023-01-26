import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  Alert,
} from 'react-native'
import * as Permissions from 'expo-permissions'
import moment from 'moment'
import authStyle from '../../styles/Auth'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import * as Yup from 'yup'
import Form from '../../components/fields/Form'
import * as ImagePicker from 'expo-image-picker'
import InputField from '../../components/fields/Input'
import { PaperSelect } from 'react-native-paper-select'
import colors from '../../constants/Colors'
import * as Location from 'expo-location'
import {
  Appbar,
  Avatar,
  Button,
  IconButton,
  List,
  RadioButton,
  TextInput,
} from 'react-native-paper'
import { StyleSheet, Dimensions } from 'react-native'
import color from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { createEmployee } from '../../services/actions/employee'
import MapView, { Marker } from 'react-native-maps'

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
    marginTop: 20,
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
  mapView: {
    width: '100%',
    padding: 15,
  },
  map: {
    width: '100%',
    height: 200,
  },
})

const religion = [
  { _id: '1', value: 'Islam' },
  { _id: '2', value: 'Christian' },
  { _id: '3', value: 'Budha' },
  { _id: '5', value: 'Hindu' },
]

export default function AttendanceCreate({ navigation }: any) {
  const [avatar, setAvatar] = useState()
  const createStatus = useSelector((state: any) => state.employee.create)
  const Dispatch = useDispatch()
  const day = moment().format('YYYY/MM/DD dddd')
  const [time, setTime] = useState(moment().format('HH:mm:ss'))
  const [location, setLocation] = useState({
    coords: {
      latitude: 10,
      longitude: 10,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
  })
  const [form, setForm] = useReducer(
    (oldState: any, newState: any) => ({ ...oldState, ...newState }),
    {
      nip: '2020040056',
      name: 'Noda',
      status: 'wfh',
      religion: 'islam',
      address: 'Sukamaju',
      avatar: '',
    }
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format('HH:mm:ss'))
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const getLocationCallback = useCallback(async () => {
    console.log('CT')
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied')
      return
    }
    // let location: any = await Location.getCurrentPositionAsync({})
    // console.log(location)
    // setLocation(location)

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    })
    setLocation(location)
  }, [])

  useEffect(() => {
    getLocationCallback()
  }, [])

  const handlePickImage = useCallback(async () => {
    await Permissions.getAsync(Permissions.CAMERA)
    const permission = await Permissions.getAsync(Permissions.CAMERA)
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA)
      if (newPermission.status === 'granted') {
        ImagePicker.launchCameraAsync({
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
      }
    } else {
      Alert.alert('Camera permission not granted')
    }
  }, [])

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

  //   A. userID
  // B. Tgl_presensi
  // C. Jam_presensi
  // D. lokasi_presensi (GPS)
  // E. Status_presensi (WFH/WFO)
  // F. Foto_presensi

  return (
    <SafeAreaView>
      <Appbar.Header style={style.header}>
        <Appbar.BackAction
          onPress={() => navigation.navigate('employee.index')}
          color={scheme.primary}
        />
        <Appbar.Content title="New Attendance" />
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

      <List.Item
        title={time}
        description={day}
        left={(props) => <List.Icon {...props} icon="folder" />}
      />

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

        <Text style={style.label}>Status</Text>
        <View style={style.rowSelect}>
          <View style={style.colSelect}>
            <RadioButton
              value="wfh"
              status={form.status === 'wfh' ? 'checked' : 'unchecked'}
              onPress={() => setForm({ status: 'wfh' })}
            />
            <Text>WFH</Text>
          </View>
          <View style={style.colSelect}>
            <RadioButton
              value="wfo"
              status={form.status === 'wfo' ? 'checked' : 'unchecked'}
              onPress={() => setForm({ status: 'wfo' })}
            />
            <Text>WFO</Text>
          </View>
        </View>
        {createStatus.data?.gender?.[0] && (
          <Text style={style.error}>{createStatus.data?.gender?.[0]}</Text>
        )}
      </View>

      <View style={style.mapView}>
        <MapView
          style={style.map}
          pitchEnabled={true}
          rotateEnabled={true}
          zoomEnabled={true}
          scrollEnabled={true}
          zoomTapEnabled={true}
          region={{
            ...location.coords,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          <Marker
            coordinate={{
              ...location.coords,
            }}
            title="Your Location"
            image={{
              uri: 'https://www.google.com/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v4_outline-2-medium.png,assets/icons/spotlight/spotlight_pin_v4-2-medium.png,assets/icons/spotlight/spotlight_pin_v4_dot-2-medium.png&highlight=c5221f,ea4335,b31412?scale=2',
            }}
            description="Your current location "
          />
        </MapView>
      </View>
      <View style={style.save}>
        <Button
          mode="contained"
          // disabled={!isValid || !form.avatar}
          onPress={handleSubmit}
          style={{ borderRadius: 4 }}
        >
          Save
        </Button>
      </View>
    </SafeAreaView>
  )
}
