import { View, SafeAreaView, Text, Image } from 'react-native'
import authStyle from '../../styles/Auth'
import { useCallback, useEffect, useReducer } from 'react'
import * as Yup from 'yup'
import Form from '../../components/fields/Form'
import InputField from '../../components/fields/Input'
import Button from '../../components/fields/Button'
import colors from '../../constants/Colors'
import { login } from '../../services/actions/auth'
import { useDispatch } from 'react-redux'
import Guest from '../../services/routers/Guest'
const scheme = colors.light

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('This field is Required'),
  password: Yup.string()
    .min(4, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('This field is Required'),
})

const initialForm = {
  email: 'me@tofikhidayat.xyz',
  password: 'secret',
}

export default function LoginScreen({ navigation }: any) {
  const Dispatch = useDispatch()
  const handleSubmit = useCallback((form: any) => {
    // console.log(form)
    // navigation.navigate('home')
    Dispatch(login(form))
    // navigation.navigate('home', {})
  }, [])

  useEffect(() => {
    // navigation.navigate('home')
  }, [])

  return (
    <Guest navigation={navigation}>
      <SafeAreaView>
        <View style={authStyle.wrapper}>
          <View style={authStyle.pageContent}>
            <View style={authStyle.logoWrapper}>
              <Image
                style={authStyle.logo}
                source={require('../../assets/images/icon.png')}
              />
            </View>
            <View style={authStyle.alertWraper}>
              <Text style={authStyle.alertText}>Hi!</Text>
              <Text style={authStyle.alertText}>Welcome Back</Text>
            </View>
            <View style={authStyle.inputWrapper}>
              <Form
                validation={validationSchema}
                onSubmit={handleSubmit}
                initialValues={initialForm}
              >
                {(form: any) => (
                  <>
                    <InputField
                      label="Email"
                      name="email"
                      placeholder="Insert your email"
                      form={form}
                      withError
                    />
                    <InputField
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      form={form}
                      withError
                      secure
                    />
                    <Button
                      text="Sign In"
                      style={{ marginTop: 15 }}
                      textStyle={{ fontWeight: 'bold' }}
                      onPress={form.handleSubmit}
                    />
                  </>
                )}
              </Form>
              <View style={authStyle.signinUsing}>
                <View style={authStyle.siginUsingDivider}></View>
                <Text style={authStyle.siginUsingText}>OR SIGN IN USING</Text>
                <View style={authStyle.siginUsingDivider}></View>
              </View>
              <Button
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 7,
                }}
                background={scheme.grey}
                textStyle={{ fontWeight: 'bold' }}
              >
                <Image
                  style={{ height: 26, width: 26, marginRight: 5 }}
                  source={require('../../assets/images/google.png')}
                />
                <Text style={{ color: scheme.black }}>Google</Text>
              </Button>
            </View>
            <View style={authStyle.bottomAction}>
              <Text
                style={authStyle.bottomActionLink}
                onPress={() => navigation.navigate('auth.signup')}
              >
                Don't have an account?
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Guest>
  )
}
