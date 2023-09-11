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
import {SCREEN_WIDTH} from '../../utils/constants';

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
  videoView: {
    width: SCREEN_WIDTH - 40,
    height: 200,
    marginBottom: 10,
  },
  body: {
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
  inputt: {
    marginVertical: 10,
    marginRight: 10,
    color: APP_COLORS.black,
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

  icCookTime: {
    marginLeft: 20,
    width: 30,
    height: 30,
  },
  textCooktime: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  category: {
    flexDirection: 'row',
  },
  checkboxContainer: {
    marginLeft: 50,
    marginTop: 10,
    marginBottom: 20,
  },
  textcategory: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  inputingredeients: {
    flexDirection: 'row',
  },
  btnIc: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    marginRight: 20,
  },
  icUnion: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  imageFood: {
    height: 100,
    width: 100,
  },
  cooktime: {
    flexDirection: 'row',
    backgroundColor: APP_COLORS.popularCategory,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItem: {
    flexDirection: 'row',
  },

  ingredientsInput: {
    width: 180,
    marginVertical: 5,
    maxHeight: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: APP_COLORS.grey,
  },
  ingredientsInput2: {
    width: 120,
    maxHeight: 80,
    marginVertical: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: APP_COLORS.grey,
  },
  textError: {
    color: APP_COLORS.error,
  },
  stepContainer: {
    flexDirection: 'row',
    padding: 24,
    backgroundColor: APP_COLORS.popularCategory,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: 300,
    height: 100,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    backgroundColor: APP_COLORS.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  stepNumber: {
    fontWeight: 'bold',
  },
  stepInput: {
    textAlign: 'left',
    flex: 1,
  },
  textview: {
    flexDirection: 'row',
  },
});
