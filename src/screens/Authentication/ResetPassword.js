import {useNavigation, useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Yup from 'yup';
import {
  Button,
  Input,
  KeyboardContainer,
  LocalImage,
  SafeAreaContainer,
  Text,
} from '../../components';
import {useAuthentication} from '../../hooks/useAuthentication';
import {APP_COLORS} from '../../themes/colors';

const ResetPassword = () => {
  const {navigate, popToTop} = useNavigation();
  const {resetPassword} = useAuthentication();
  const route = useRoute();
  const {email} = route.params || {};

  const formik = useFormik({
    initialValues: {
      email: email,
      password: '123456',
      confirmPassword: '123456',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is wrong format')
        .required('Email is required'),
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
      resetPassword(values);
    },
  });

  const navigateLogin = () => {
    navigate('Login');
  };
  return (
    <SafeAreaContainer>
      <KeyboardContainer style={styles.container}>
        <TouchableOpacity style={styles.viewBackIcon} onPress={popToTop}>
          <LocalImage
            imageKey={'icCaretLeftx24'}
            style={styles.backIconLogin}
          />
        </TouchableOpacity>
        <Text type={'bold-30'} style={styles.signUpTxt}>
          Reset Password
        </Text>
        <View style={styles.inputView}>
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
          label={'RESET PASSWORD'}
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
      </KeyboardContainer>
    </SafeAreaContainer>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  signUpTxt: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 29,
  },
  inputView: {
    marginTop: 50,
  },
  forgotPasswordBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
  },
  backIconLogin: {width: 20, height: 20},
});
