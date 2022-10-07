import { View, SafeAreaView, Text, Image } from 'react-native'
import authStyle from '../../styles/Auth'
import { useCallback, useMemo, useReducer, useState } from 'react'
import * as Yup from 'yup'
import Form from '../../components/fields/Form'
import InputField from '../../components/fields/Input'
import SelectField from '../../components/fields/Select'
import Button from '../../components/fields/Button'
import colors from '../../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import Guest from '../../services/routers/Guest'
const scheme = colors.light

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('This field is Required'),
  fullname: Yup.string().required('This field is Required'),
  nip: Yup.number().required('This field is Required'),
  password: Yup.string()
    .min(6)
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('This field is Required'),
  confirm_password: Yup.string()
    .min(6)
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('This field is Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const initialForm = {
  nip: '',
  email: '',
  password: '',
  confirm_password: '',
  fullname: '',
}

export default function LoginScreen({ navigation }: any) {
  const handleSubmit = useCallback((form: any) => {
    navigation.navigate('home')
  }, [])
  return (
    <Guest navigation={navigation}>
      <SafeAreaView>
        <View style={authStyle.wrapper}>
          <View
            style={{ ...authStyle.pageContent, padding: 0, paddingBottom: 50 }}
          >
            <ScrollView style={{ padding: 15 }}>
              <View style={authStyle.logoWrapper}>
                <Image
                  style={authStyle.logo}
                  source={require('../../assets/images/icon.png')}
                />
              </View>

              <View style={authStyle.alertWraper}>
                <Text style={authStyle.alertText}>Create</Text>
                <Text style={authStyle.alertText}>Your Account</Text>
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
                        label="NIP"
                        name="nip"
                        placeholder="Insert your nip"
                        form={form}
                        withError
                      />
                      <InputField
                        label="Email"
                        name="email"
                        placeholder="Insert your email"
                        form={form}
                        withError
                      />
                      <InputField
                        label="Full Name"
                        name="fullname"
                        placeholder="Insert your full name"
                        form={form}
                        withError
                      />
                      {/* <SelectField
                    label="Primary Currency"
                    name="currency"
                    placeholder="Currency"
                    form={form}
                    options={currencyOptions}
                    withError
                  /> */}
                      <InputField
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        form={form}
                        withError
                        secure
                      />
                      <InputField
                        label="Confirm Password"
                        name="confirm_password"
                        placeholder="Enter your password"
                        form={form}
                        withError
                        secure
                      />
                      <Button
                        text="Sign Up"
                        style={{ marginTop: 15 }}
                        textStyle={{ fontWeight: 'bold' }}
                        onPress={form.handleSubmit}
                      />
                    </>
                  )}
                </Form>
                <View style={authStyle.signinUsing}>
                  <View style={authStyle.siginUsingDivider}></View>
                  <Text style={authStyle.siginUsingText}>OR SIGN UP USING</Text>
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
                  onPress={() => navigation.navigate('home')}
                >
                  <Image
                    style={{ height: 26, width: 26, marginRight: 5 }}
                    source={require('../../assets/images/google.png')}
                  />
                  <Text style={{ color: scheme.black }}>Google</Text>
                </Button>
              </View>
              <View style={{ ...authStyle.bottomAction, marginTop: 50 }}>
                <Text
                  style={authStyle.bottomActionLink}
                  onPress={() => navigation.navigate('auth.signin')}
                >
                  Already Have An Account?
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Guest>
  )
}
