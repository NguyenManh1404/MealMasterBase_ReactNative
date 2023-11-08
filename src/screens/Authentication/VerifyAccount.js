import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  KeyboardContainer,
  LocalImage,
  SafeAreaContainer,
  Text,
} from '../../components';

import {useAuthentication} from '../../hooks/useAuthentication';
import {APP_COLORS} from '../../themes/colors';
import {APP_IMAGES} from '../../themes/images';
import {showSystemAlert} from '../../utils/helpers';
import VerifyCodeField from './components/VerifyCodeField';

const VerifyAccount = () => {
  const {goBack} = useNavigation();
  const {verifyEmail, verifyEmailLoading} = useAuthentication();
  const verifyCodeFieldRef = useRef();
  const route = useRoute();
  const {email, isFromForgotPassword} = route.params || {};

  const onVerifyCode = () => {
    const emailVerificationCode = verifyCodeFieldRef?.current?.getCode();

    if (emailVerificationCode?.length < 6) {
      return showSystemAlert({
        message: 'Reset password code is invalid !',
      });
    }
    verifyEmail({
      emailVerificationCode,
      email,
      isFromForgotPassword,
    });
  };

  const navigateSignIn = () => {
    // navigate('');
  };
  return (
    <SafeAreaContainer loading={verifyEmailLoading}>
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
              <Text type={'bold-30'}>Verification Code</Text>
              <Text type={'bold-14'} color={APP_COLORS.greyText}>
                Please type the verification code sent to {email}
              </Text>
              <View style={styles.inputView}>
                <VerifyCodeField
                  style={styles.codeFieldRoot}
                  ref={verifyCodeFieldRef}
                />
              </View>

              <Button
                label={'VERIFY'}
                style={styles.button}
                onPress={onVerifyCode}
              />
              <TouchableOpacity
                style={styles.forgotPasswordBtn}
                onPress={navigateSignIn}>
                <Text>
                  <Text type={'bold-14'} color={APP_COLORS.black}>
                    I don’t recevie a code!{' '}
                  </Text>
                  <Text type={'bold-14'} color={APP_COLORS.primary}>
                    Please resend
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

export default VerifyAccount;

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
