import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import authStyle from '../../styles/Auth'
import { useCallback, useEffect, useReducer } from 'react'
import * as Yup from 'yup'
import Form from '../../components/fields/Form'
import InputField from '../../components/fields/Input'
import colors from '../../constants/Colors'
import { Avatar, Button, IconButton, List } from 'react-native-paper'
import { StyleSheet, Dimensions } from 'react-native'
import color from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Appbar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { listParticipant } from '../../services/actions/participant'
import moment from 'moment'

const scheme = color.light
const { width, height } = Dimensions.get('window')

const style = StyleSheet.create<any>({
  wrapper: {
    // backgroundColor: scheme.secondary,
    // innerHeight: '100%',
    // flex: 1,
    height: height,
  },
  absoluteAdd: {
    borderTopWidth: 1,
    borderTopColor: scheme.secondary,
    position: 'absolute',
    backgroundColor: scheme.white,
    bottom: 150,
    left: 0,
    padding: 10,
    paddingBottom: 40,
    width: '100%',
  },
  employeItem: {
    borderBottomWidth: 1,
    borderBottomColor: scheme.divider,
    backgroundColor: scheme.white,
  },
  scrolable: {
    height: height - 200,
  },
  header: {
    backgroundColor: scheme.white,
    borderBottomWidth: 1,
    borderBottomColor: scheme.divider,
  },
})

export default function ParticipantIndex({ navigation }: any) {
  const participants = useSelector(
    (state: any) => state?.participant?.list?.data || []
  )
  const Dispatch = useDispatch()
  useEffect(() => {
    Dispatch(listParticipant())
  }, [])

  return (
    <SafeAreaView>
      <Appbar.Header style={style.header}>
        <Appbar.BackAction
          onPress={() => navigation.navigate('home')}
          color={scheme.primary}
        />
        <Appbar.Content title="Participant" />
      </Appbar.Header>
      <View style={style.wrapper}>
        <View style={style.scrolable}>
          <ScrollView>
            {participants.map((usr: any, idx: number) => (
              <List.Item
                title={`${_.startCase(usr.name)} | ${usr.email}`}
                description={`${_.startCase(usr.gender)} | ${usr.phone} |  ${
                  usr.registration_number
                } | ${moment(usr.created_at).format('DD/MM/YYYY')}`}
                key={idx}
                style={style.employeItem}
                right={(props) => (
                  <IconButton
                    size={24}
                    iconColor={scheme.primary}
                    icon="pencil"
                  />
                )}
                left={(props) => (
                  <Avatar.Image size={45} source={{ uri: usr.avatar_url }} />
                )}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={style.absoluteAdd}>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => navigation.navigate('participant.create')}
          style={{ borderRadius: 10 }}
        >
          Add New Participant
        </Button>
      </View>
    </SafeAreaView>
  )
}
