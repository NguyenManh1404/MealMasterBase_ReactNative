import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {useFormik} from 'formik';
import React from 'react';
import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {editProfileApi} from '../../api/auth';
import {
  Button,
  Input,
  KeyboardContainer,
  LocalImage,
  SafeAreaContainer,
  Text,
} from '../../components';
import {useMediaPicker} from '../../hooks/useMediaPicker';
import {setUser} from '../../redux/AuthRedux';
import {APP_COLORS} from '../../themes/colors';
import {PHONE_VALID} from '../../utils/constants';
import {getRandomColorHex, isURL, showSystemAlert} from '../../utils/helpers';

const getRandomColorHe = getRandomColorHex();

const EditProfile = props => {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();

  const userData = props.route?.params?.userData;

  const {showImagePickerOptions} = useMediaPicker(imageResult => {
    if (imageResult?.payload.filename) {
      formik.setFieldValue('avatar', imageResult?.payload.filename);
    }
  });
  const pickImage = () => {
    showImagePickerOptions();
  };

  const {mutateAsync: editProfile, isLoading: editProfileLoading} = useMutation(
    editProfileApi,
    {
      onSuccess: res => {
        dispatch(setUser(res?.data));
        showSuccessMessage();
        goBack();
      },
      onError: error => {
        showSystemAlert({
          message: JSON.stringify(error.errors[0].message),
        });
      },
    },
  );

  const showSuccessMessage = () => {
    ToastAndroid.show('Edited Successfully!', ToastAndroid.SHORT);
  };

  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phoneNumber: userData.phoneNumber || '0379923354',
      email: userData.email || 'ngatuong2301@gmail.com',
      avatar: userData.avatar,
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
    }),
    onSubmit: values => {
      editProfile(values);
    },
  });
  return (
    <SafeAreaContainer loading={editProfileLoading}>
      <KeyboardContainer>
        <TouchableOpacity onPress={goBack} style={styles.viewBackIcon}>
          <LocalImage
            imageKey={'icCaretLeftx24'}
            style={styles.backIconLogin}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageAvatar} onPress={pickImage}>
          {formik.values.avatar ? (
            <Image
              source={{
                uri: isURL(userData?.avatar)
                  ? userData?.avatar
                  : `${Config.BASE_URL_API}/public/${formik.values.avatar}`,
              }}
              style={styles.defaultAvatar}
            />
          ) : (
            <View
              style={[
                styles.defaultAvatar,
                {backgroundColor: getRandomColorHe},
              ]}>
              <Text type={'bold-20'} color={APP_COLORS.white}>
                {userData?.firstName?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.imageCamera}>
            <Icon name="camera" size={20} color={APP_COLORS.primary} solid />
          </View>

          <Text type="bold-16" style={styles.nameUser} numberOfLines={1}>
            {userData?.firstName + ' ' + userData?.lastName}
          </Text>
        </TouchableOpacity>
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
            style={[styles.input1]}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            defaultValue={formik.values.email}
            editable={false}
            selectTextOnFocus={false}
            label={'E-mail'}
            placeholder={'Your email address'}
            returnKeyType="next"
            inputContainerStyle={{
              backgroundColor: APP_COLORS.backGroundPrimary,
            }}
          />
        </View>
        <Button
          label={'SAVE'}
          style={styles.button}
          onPress={formik.handleSubmit}
        />
      </KeyboardContainer>
    </SafeAreaContainer>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  imageAvatar: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLORS.blue,
  },

  inputView: {
    marginTop: 20,
  },
  input: {
    marginBottom: 29,
    width: '90%',
    marginLeft: 20,
  },
  input1: {
    marginBottom: 29,
    width: '90%',
    marginLeft: 20,
  },
  viewBackIcon: {
    marginVertical: 20,
  },
  backIconLogin: {width: 30, height: 30},
  button: {
    marginVertical: 30,
    width: '50%',
    borderRadius: 10,
    marginLeft: 100,
  },
  imageCamera: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 60,
    backgroundColor: APP_COLORS.white,
    padding: 7,
    borderRadius: 50,
  },
  nameUser: {
    marginVertical: 10,
    flex: 1,
    width: 110,
  },
});
