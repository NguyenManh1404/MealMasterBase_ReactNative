import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import * as Yup from 'yup';
import {LocalImage, SafeAreaContainer, Text} from '../../components';
import {useMediaPicker} from '../../hooks/useMediaPicker';
import {APP_COLORS} from '../../themes/colors';

const RecipeScreen = () => {
  const [images, setImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      images: [],
    },
    validationSchema: Yup.object({
      images: Yup.array()

        .min(0, 'Images must have at least one element')
        .required('Please select images'),
    }),
    onSubmit: values => {
      // createRecipe(values);
    },
  });

  const onRemoveImage = index => {
    let item = [...images];
    item.splice(index, 1);
    setImages([...item]);
    formik.setFieldValue('images', images);
  };

  const {showImagePickerOptions} = useMediaPicker(imageResult => {
    if (imageResult?.payload.filename) {
      setImages([...images, imageResult?.payload.filename]);
      formik.setFieldValue('images', images);
    }
  });

  const pickImage = () => {
    showImagePickerOptions();
  };

  const onCreate = () => {
    formik.handleSubmit();
  };

  return (
    <SafeAreaContainer loading={false}>
      <ScrollView>
        <Text type={'bold-20'} style={styles.titleCreate}>
          Create recipe
        </Text>

        <View style={styles.viewAddImage}>
          {images.map((image, index) => {
            return (
              <View key={index} style={styles.imageItem}>
                <TouchableOpacity
                  onPress={() => onRemoveImage(index)}
                  style={styles.icDelete}>
                  <LocalImage
                    imageKey={'icDelete'}
                    style={styles.iconDelete}
                    tintColor={APP_COLORS.error}
                  />
                </TouchableOpacity>
                <Image
                  source={{
                    uri: `${Config.BASE_URL_API}/public/${image}`,
                  }}
                  style={styles.imageFood}
                />
              </View>
            );
          })}
          <TouchableOpacity onPress={pickImage} style={styles.btnAdd}>
            <LocalImage imageKey={'addIcon'} style={styles.addIcon} />
            <Text type={'bold-14'}>Add Image</Text>
          </TouchableOpacity>
          {formik.errors.images && (
            <Text style={styles.textError}>{formik.errors.images} </Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.btnSave} onPress={() => onCreate()}>
        <Text style={styles.textsave}>Save my receip</Text>
      </TouchableOpacity>
    </SafeAreaContainer>
  );
};
export default RecipeScreen;

const styles = StyleSheet.create({
  iconDelete: {height: 15, width: 15},
  addIcon: {height: 40, width: 40},
  icDelete: {
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 1,
    top: -10,
    backgroundColor: APP_COLORS.white,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnAdd: {
    alignItems: 'center',
  },
  imageItem: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  viewAddImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  btnSave: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  textsave: {
    color: APP_COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleCreate: {
    alignSelf: 'center',
  },

  imageFood: {
    height: 100,
    width: 100,
  },

  textError: {
    color: APP_COLORS.error,
  },
});
