import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Input,
  KeyboardContainer,
  LocalImage,
  SafeAreaContainer,
  Text,
} from '../../components';

import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {useAuthentication} from '../../hooks/useAuthentication';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';

const SendCodeVerifyEmail = () => {
  const {goBack, navigate} = useNavigation();
  const {requestCodeVerifyEmail, requestCodeVerifyEmailLoading} =
    useAuthentication();
  const {t} = useTranslation();

  const navigateResgister = () => {
    navigate('Register');
  };

  const formik = useFormik({
    initialValues: {
      email: 'hungmanh14042001@gmail.com',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('validation.emailInvalid'))
        .required(t('validation.emailIsRequire')),
    }),
    onSubmit: values => {
      requestCodeVerifyEmail(values);
    },
  });
  return (
    <SafeAreaContainer loading={requestCodeVerifyEmailLoading}>
      <KeyboardContainer>
        <ImageBackground
          source={APP_IMAGES.backgroundAuthen}
          style={styles.imageBackground}>
          <View style={styles.body}>
            <TouchableOpacity style={styles.viewBackIcon} onPress={goBack}>
              <LocalImage
                imageKey={'icCaretLeftx24'}
                style={styles.backIconLogin}
              />
            </TouchableOpacity>
            <View style={styles.form}>
              <Text type={'bold-30'}>Resset Password</Text>
              <Text color={APP_COLORS.gray}>
                Please enter your email address to request a password reset
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
                  label={t('authentication.emailAddress')}
                  placeholder={t('authentication.yourEmailAddress')}
                  returnKeyType="next"
                />
              </View>

              <Button
                label={'Get code'}
                style={styles.button}
                onPress={formik.handleSubmit}
              />
              <TouchableOpacity
                style={styles.forgotPasswordBtn}
                onPress={navigateResgister}>
                <Text>
                  <Text type={'bold-14'} color={APP_COLORS.black}>
                    I don’t have account!{' '}
                  </Text>
                  <Text type={'bold-14'} color={APP_COLORS.primary}>
                    Register your account?
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardContainer>
    </SafeAreaContainer>
  );
};

export default SendCodeVerifyEmail;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  backIconLogin: {width: 20, height: 20},
  body: {
    padding: 32,
  },
  form: {
    marginTop: 100,
  },
  inputView: {
    marginTop: 50,
  },
  forgotPasswordBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 30,
  },
});
