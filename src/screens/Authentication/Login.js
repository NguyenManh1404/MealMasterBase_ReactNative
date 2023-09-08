import {useNavigation, useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
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
import {SCREEN_WIDTH} from '../../utils/constants';

const Login = () => {
  const {navigate} = useNavigation();
  const {t} = useTranslation();
  const route = useRoute();
  const {email} = route.params || {};

  const {loginFacebook, loginGoogle, loginByEmail, loginByEmailLoading} =
    useAuthentication();

  const formik = useFormik({
    initialValues: {
      email: email || 'manh.nguyen22@student.passerellesnumeriques.org',
      password: '123456',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('validation.emailInvalid'))
        .required(t('validation.emailIsRequire')),
      password: Yup.string()
        .min(6, t('validation.password6-20'))
        .max(20, t('validation.password6-20'))
        .required(t('validation.passwordIsRequire')),
    }),
    onSubmit: values => {
      loginByEmail({...values, tokenDevice: 'demo-token'});
    },
  });

  const navigateFogortPassWord = () => {
    navigate('SendCodeVerifyEmail');
  };

  const navigateSignIn = () => {
    navigate('Register');
  };
  return (
    <SafeAreaContainer loading={loginByEmailLoading}>
      <KeyboardContainer>
        <View style={styles.body}>
          <View style={styles.form}>
            <Text type={'bold-30'}>{t('authentication.login')}</Text>
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
              <Input
                required
                style={styles.input}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                error={formik.errors.password}
                defaultValue={formik.values.password}
                label={t('authentication.password')}
                placeholder={t('authentication.password')}
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              style={styles.forgotPasswordBtn}
              onPress={navigateFogortPassWord}>
              <Text type={'bold-14'} color={APP_COLORS.primary}>
                {t('authentication.forgotPassword')} ?
              </Text>
            </TouchableOpacity>
            <Button
              label={t('authentication.login')}
              style={styles.button}
              onPress={formik.handleSubmit}
            />
            <TouchableOpacity
              style={styles.forgotPasswordBtn}
              onPress={navigateSignIn}>
              <Text>
                <Text type={'bold-14'}>
                  {t('authentication.doNotHaveAccount')} ?{' '}
                </Text>
                <Text type={'bold-14'} color={APP_COLORS.primary}>
                  {t('authentication.signUp')}
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.socialView}>
              <View style={styles.signWith}>
                <View style={styles.divider} />
                <Text type={'bold-14'}>{t('authentication.signInWith')}</Text>
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

                <TouchableOpacity
                  style={styles.buttonSocial}
                  onPress={() => {}}>
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
        </View>
      </KeyboardContainer>
    </SafeAreaContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    padding: 32,
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
    marginVertical: 30,
  },
  signWith: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: APP_COLORS.greyL2,
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
