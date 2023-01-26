import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native'
import authStyle from '../../styles/Auth'
import { useCallback, useEffect, useReducer } from 'react'
import * as Yup from 'yup'
import Form from '../../components/fields/Form'
import InputField from '../../components/fields/Input'
import colors from '../../constants/Colors'
import { Avatar, Button, IconButton } from 'react-native-paper'
import { StyleSheet, Dimensions } from 'react-native'
import color from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Authenticate from '../../services/routers/Authenticate'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../services/actions/auth'
import { TouchableOpacity } from 'react-native-gesture-handler'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('This field is Required'),
  password: Yup.string()
    .min(6)
    .min(8, 'Password is too short - should be 8 chars minimum.')
    // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('This field is Required'),
})

const initialForm = {
  email: '',
  password: '',
}

const scheme = color.light

const style = StyleSheet.create<any>({
  wrapper: {
    height: '100%',
    // backgroundColor: scheme.secondary,
    // innerHeight: '100%',
    // flex: 1,
  },
  hero: {
    minHeight: 90,
    backgroundColor: scheme.primary,
    padding: 10,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    color: scheme.white,
  },
  avatarWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatarImage: {
    width: 50,
  },
  avatarDetail: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  avatarName: {
    fontWeight: 'bold',
    color: scheme.white,
  },
  avatarJob: {
    fontSize: 12,
    color: scheme.white,
  },
  rowMenu: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  rowIcon: {
    width: '25%',
    flexDirection: 'row',
  },
  touchIcon: {
    width: '100%',
    opacity: 1,
    alignItems: 'center',
  },
  colParent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  colName: {
    color: scheme.dark,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  },
  menuName: {},
  bottomLogout: {
    position: 'absolute',
    // backgroundColor: 'red',
    bottom: 100,
    left: 0,
    padding: 10,
    width: '100%',
  },
  copyright: {
    marginTop: 10,
    textAlign: 'center',
  },
})

export default function LoginScreen({ navigation }: any) {
  const user = useSelector((state: any) => state?.profile?.profile?.data)
  const Dispatch = useDispatch()
  useEffect(() => {
    // navigation.navigate('participant.create')
    // setTimeout(() => {
    // navigation.navigate('attendance.create')
    // }, 3000)
  }, [])

  return (
    <Authenticate navigation={navigation}>
      <SafeAreaView>
        {/* <StatusBar backgroundColor="red"></StatusBar> */}
        <View style={style.wrapper}>
          <View style={style.hero}>
            <View style={style.avatarWrapper}>
              <View style={style.avatarImage}>
                <Avatar.Image
                  size={50}
                  source={
                    user?.avatar_url
                      ? { uri: user?.avatar_url }
                      : require('../../assets/images/tofik.png')
                  }
                />
              </View>
              <View style={style.avatarDetail}>
                <Text style={style.avatarName}>{user?.name || '-'}</Text>
                <Text style={style.avatarJob}>Admin</Text>
              </View>
            </View>
          </View>
          <View style={style.rowMenu}>
            <View style={style.rowIcon}>
              <TouchableOpacity
                style={style.touchIcon}
                onPress={() => navigation.navigate('employee.index')}
              >
                <View style={style.colParent}>
                  <Icon name="users" size={30} color={scheme.primary} />
                  <Text style={style.colName}>Employee</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={style.rowIcon}>
              <TouchableOpacity
                style={style.touchIcon}
                onPress={() => navigation.navigate('attendance.create')}
              >
                <View style={style.colParent}>
                  <Icon name="calendar" size={30} color={scheme.primary} />
                  <Text style={style.colName}>Attendance</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={style.rowIcon}>
              <TouchableOpacity
                style={style.touchIcon}
                onPress={() => navigation.navigate('participant.index')}
              >
                <View style={style.colParent}>
                  <Icon name="user" size={30} color={scheme.primary} />
                  <Text style={style.colName}>Participant</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={style.rowIcon}>
              <TouchableOpacity
                style={style.touchIcon}
                onPress={() => navigation.navigate('developer.index')}
              >
                <View style={style.colParent}>
                  <Icon name="dev" size={30} color={scheme.primary} />
                  <Text style={style.colName}>Developer</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={style.bottomLogout}>
          <Button
            mode="contained"
            buttonColor="grey"
            icon="logout"
            onPress={() => Dispatch(logout())}
            style={{ borderRadius: 4 }}
          >
            Logout
          </Button>
          <Text style={style.copyright}>
            &copy; Tofik Hidayat . UAS Mobile programming , 2023
          </Text>
        </View>
      </SafeAreaView>
    </Authenticate>
  )
}
