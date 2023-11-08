import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';
import {
  Button,
  Input,
  KeyboardContainer,
  SafeAreaContainer,
  Text,
} from '../../components';
import {useAuthentication} from '../../hooks/useAuthentication';
import {APP_COLORS} from '../../themes/colors';
import {EMPTY_STRING, PHONE_VALID, SCREEN_WIDTH} from '../../utils/constants';

const Register = () => {
  const {navigate} = useNavigation();
  const {registerAccount, registerAccountLoading} = useAuthentication();

  const {loginFacebook, loginGoogle} = useAuthentication();

  const formik = useFormik({
    initialValues: {
      firstName: EMPTY_STRING,
      lastName: EMPTY_STRING,
      email: EMPTY_STRING,
      phoneNumber: '0379923354',
      // 0987654321
      password: '123456',
      confirmPassword: '123456',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Firstname must be greater than or equal 3 characters')
        .max(20, 'Firstname must be less than or equal 20 characters')
        .required('Firstname is required'),
      lastName: Yup.string()
        .min(3, 'Lastname must begreater than or equal 3 characters')
        .max(20, 'Lastname must be less than or equal 20 characters')
        .required('Lastname is required'),
      email: Yup.string()
        .email('Email is wrong format')
        .required('Email is required'),
      phoneNumber: Yup.string()
        .min(10, 'PhoneNumber must be greater than or equal 10 characters')
        .max(11, 'PhoneNumber must be less than or equal 11 characters')
        .matches(PHONE_VALID, 'PhoneNumber is wrong format')
        .required('Phonenumber is required'),
      password: Yup.string()
        .min(6, 'Password must be greater than or equal 6 characters')
        .max(20, 'Password must be less than or equal to 20 characters')
        .required('Password is wrong format'),
      confirmPassword: Yup.string()
        .min(6, 'ConfirmPassword must be greater than or equal 6 characters')
        .max(20, 'ConfirmPassword must beless than or equal 20 characters')
        .required('ConfirmPassword must be a required field')
        .oneOf(
          [Yup.ref('password'), null],
          'validation.confirmPasswordNotMatch',
        ),
    }),
    onSubmit: values => {
      registerAccount(values);
    },
  });

  const navigateLogin = () => {
    navigate('Login');
  };
  return (
    <SafeAreaContainer loading={registerAccountLoading}>
      <KeyboardContainer>
        <View style={styles.body}>
          <Text type={'bold-30'} style={styles.signUpTxt}>
            Sign Up
          </Text>
          <View style={styles.inputView}>
            <Input
              required
              style={styles.input}
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              error={formik.errors.firstName}
              defaultValue={formik.values.firstName}
              label={'First Name'}
              placeholder={'Enter Your First Name'}
            />
            <Input
              required
              style={styles.input}
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              error={formik.errors.lastName}
              defaultValue={formik.values.lastName}
              label={'Last Name'}
              placeholder={'Enter Your Last Name'}
            />
            <Input
              required
              keyboardType="phone-pad"
              style={styles.input}
              onChangeText={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
              error={formik.errors.phoneNumber}
              defaultValue={formik.values.phoneNumber}
              label={'Phone Number'}
              placeholder={'Your email phone number'}
              returnKeyType="next"
            />
            <Input
              required
              keyboardType="email-address"
              style={styles.input}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              error={formik.errors.email}
              defaultValue={formik.values.email}
              label={'E-mail'}
              placeholder={'Your email address'}
              returnKeyType="next"
            />
            <Input
              required
              style={styles.input}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              error={formik.errors.password}
              defaultValue={formik.values.password}
              label={'Password'}
              placeholder={'Passwords'}
              secureTextEntry
            />
            <Input
              required
              style={styles.input}
              onChangeText={formik.handleChange('confirmPassword')}
              onBlur={formik.handleBlur('confirmPassword')}
              error={formik.errors.confirmPassword}
              defaultValue={formik.values.confirmPassword}
              label={'ConfirmPassword'}
              placeholder={'ConfirmPasswords'}
              secureTextEntry
            />
          </View>
          <Button
            label={'SIGN UP'}
            style={styles.button}
            onPress={formik.handleSubmit}
          />
          <TouchableOpacity
            style={styles.forgotPasswordBtn}
            onPress={navigateLogin}>
            <Text>
              <Text type={'bold-14'} color={APP_COLORS.blackText}>
                Already have an account? {''}
              </Text>
              <Text type={'bold-14'} color={APP_COLORS.primary}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.socialView}>
            <View style={styles.signWith}>
              <View style={styles.divider} />
              <Text type={'bold-14'} color={APP_COLORS.blackText}>
                Sign in with
              </Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.viewButton}>
              <TouchableOpacity
                style={styles.buttonSocial}
                onPress={loginFacebook}>
                <Icon
                  name="facebook"
                  size={28}
                  color={'#139ed9'}
                  solid
                  style={styles.imageSocial}
                />
                <Text type={'bold-11'} color={APP_COLORS.black}>
                  FACEBOOK
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSocial} onPress={() => {}}>
                <Icon
                  name="apple"
                  size={28}
                  color={'black'}
                  solid
                  style={styles.imageSocial}
                />
                <Text type={'bold-11'} color={APP_COLORS.black}>
                  APPLE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSocial}
                onPress={loginGoogle}>
                <Icon
                  name="google"
                  size={28}
                  color={'#e34133'}
                  solid
                  style={styles.imageSocial}
                />
                <Text type={'bold-11'} color={APP_COLORS.black}>
                  GOOGLE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardContainer>
    </SafeAreaContainer>
  );
};

export default Register;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 32,
  },
  signUpTxt: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 29,
  },
  inputView: {
    marginTop: 18,
  },
  forgotPasswordBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
  },
  signWith: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: APP_COLORS.black,
    height: 1,
    width: SCREEN_WIDTH / 2 - 100,
    marginHorizontal: 25,
  },

  buttonSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
    backgroundColor: APP_COLORS.white,
    shadowColor: APP_COLORS.gray,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.68,
    elevation: 5,
    width: 100,
  },
  imageSocial: {
    height: 30,
    width: 30,
    marginRight: 3,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 50,
  },
  socialView: {
    marginTop: 59,
  },
});
