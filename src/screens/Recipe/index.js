import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';
import {createRecipeApi} from '../../api/recipe';
import {
  Input,
  KeyboardContainer,
  LocalImage,
  SafeAreaContainer,
  Text,
} from '../../components';
import Checkbox from '../../components/Checkbox';
import {useMediaPicker} from '../../hooks/useMediaPicker';
import {APP_COLORS} from '../../themes/colors';
import {CATEGORY, EMPTY_STRING, SCREEN_WIDTH} from '../../utils/constants';
import {
  checkValidYoutubeLink,
  getYouTubeThumbnail,
  handleOpenLink,
  showSystemAlert,
} from '../../utils/helpers';
const RecipeScreen = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const {navigate, reset} = useNavigation();

  const {mutateAsync: createRecipe, isLoading: createRecipeLoading} =
    useMutation(createRecipeApi, {
      onSuccess: () => {
        reset({
          index: 0,
          routes: [{name: 'RecipeScreen'}],
        });
        navigate('HomeScreen');
      },
      onError: error => {
        showSystemAlert({
          message: error,
        });
      },
    });
  const formik = useFormik({
    initialValues: {
      name: EMPTY_STRING,
      linkVideo: 'https://youtu.be/xgsfG_GdxG8',
      images: [],
      categories: [],
      serves: EMPTY_STRING,
      cookTime: EMPTY_STRING,
      ingredients: [],
      steps: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is require')
        .min(3, ' Name from 6-20 characters'),
      linkVideo: Yup.string()
        .matches(
          /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
          'Enter correct url!',
        )
        .required('Please enter linkVideo'),
      images: Yup.array()
        .min(1, 'Images must have at least one element')
        .required('Please select images'),
      cookTime: Yup.number()
        .required('Cooktime is required')
        .min(5, 'Cooktime must be at least 5 minus')
        .max(3000, 'Cooktime must be at most 3000 minus'),
      ingredients: Yup.array()
        .min(1, 'Ingredients must have at least one element')
        .required('ingredients is required'),
      categories: Yup.array()
        .min(1, 'Categories must have at least one element')
        .required('categories is required'),
      steps: Yup.array()
        .min(1, 'Steps must have at least one element')
        .required('Steps is required'),
    }),
    onSubmit: values => {
      createRecipe(values);
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

  const onVideoPress = linkVideo => {
    if (checkValidYoutubeLink(linkVideo)) {
      handleOpenLink({link: linkVideo});
    } else {
      return;
    }
  };

  useEffect(() => {
    formik.setFieldValue('categories', categories);
    formik.setFieldValue('ingredients', ingredients);
    formik.setFieldValue('steps', steps);
    formik.setFieldValue('images', images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, ingredients, steps, images]);

  const onSelectCategory = categoriesId => {
    const isWorkType = categories.some(id => id === categoriesId);

    if (isWorkType) {
      setCategories(prevCategoriesIds =>
        prevCategoriesIds.filter(id => id !== categoriesId),
      );
    } else {
      setCategories([...categories, categoriesId]);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, {name: '', quantity: ''}]);
    formik.setFieldValue('ingredients', ingredients);
  };

  const removeIngredient = index => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
    formik.setFieldValue('ingredients', ingredients);
  };

  const addStep = () => {
    const stepNumber = steps.length + 1;
    const newStepItem = {number: stepNumber, content: ''};
    setSteps([...steps, newStepItem]);
    formik.setFieldValue('steps', steps);
  };
  const removeStep = index => {
    const removedSteps = steps.filter((_, i) => i !== index);
    setSteps();

    const updatedStepsWithNumber = removedSteps.map((step, _index) => ({
      ...step,
      number: _index + 1,
    }));

    setSteps(updatedStepsWithNumber);
    formik.setFieldValue('steps', steps);
  };

  return (
    <SafeAreaContainer loading={createRecipeLoading}>
      <KeyboardContainer style={styles.container}>
        <Text type={'bold-20'} style={styles.titleCreate}>
          Create recipe
        </Text>
        <Input
          required
          style={styles.input}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          error={formik.errors.name}
          defaultValue={formik.values.name}
          //  autoFocus={true}
          placeholder={'Enter Name Of Recipe'}
          placeholderTextColor={APP_COLORS.gray}
          label={'Enter Name Of Recipe'}
          returnKeyType="next"
        />
        {formik.values.linkVideo && !formik.errors.linkVideo && (
          <View style={styles.thumnelYoutube}>
            <Image
              source={{
                uri: getYouTubeThumbnail(formik.values.linkVideo),
              }}
              style={styles.imageCard}
            />
            <TouchableOpacity
              style={styles.playButtonView}
              onPress={() => onVideoPress(formik.values.linkVideo)}>
              <LocalImage
                imageKey={'icPlayButton'}
                style={styles.icPlayButton}
              />
            </TouchableOpacity>
          </View>
        )}
        <Input
          required
          style={styles.input}
          onChangeText={formik.handleChange('linkVideo')}
          onBlur={formik.handleBlur('linkVideo')}
          error={formik.errors.linkVideo}
          defaultValue={formik.values.linkVideo}
          placeholder={'Paste the link to the youtube tutorial'}
          label={'Paste the link'}
          placeholderTextColor={APP_COLORS.gray}
        />

        <View style={styles.addImageView}>
          <Text style={styles.titlePickImage} type="bold-12">
            Pick Some Image To Intro
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
              <Icon name="plus" size={20} color={APP_COLORS.primary} />
              <Text type={'bold-14'} color={APP_COLORS.primary}>
                Add Image
              </Text>
            </TouchableOpacity>
          </View>
          {formik.errors.images && (
            <Text color={APP_COLORS.error} type="normal-13">
              {formik.errors.images}
            </Text>
          )}
        </View>

        <View style={styles.categoryView}>
          <View style={styles.category}>
            <Text style={styles.textCategory} type={'bold-14'}>
              Category
            </Text>
            <View style={styles.checkboxContainer}>
              {(CATEGORY || []).map((item, index) => (
                <View key={`${index}`}>
                  <Checkbox
                    label={item?.label}
                    onCheckboxPress={() => onSelectCategory(item?.id)}
                    isSelected={categories?.includes(item?.id)}
                  />
                </View>
              ))}
            </View>
          </View>
          {formik.errors.categories && (
            <Text color={APP_COLORS.error} type="normal-13">
              {formik.errors.categories}
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.cookTimeView}>
          <View style={styles.cookTime}>
            <Icon name="clock" size={20} color={APP_COLORS.primary} />
            <Text type={'bold-14'}>Cooking Time </Text>
            <TextInput
              required
              style={styles.inputPickTime}
              // placeholder={'(Minutes)'}
              returnKeyType="next"
              keyboardType="numeric"
              placeholderTextColor={APP_COLORS.gray}
              onChangeText={formik.handleChange('cookTime')}
            />
            <Text color={APP_COLORS.graydfsd}> (Minutes)</Text>
          </View>
          {formik.errors.cookTime && (
            <Text color={APP_COLORS.error} type="normal-13">
              {formik.errors.cookTime}{' '}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.ingredientsView}>
          <Text type={'bold-14'}>Ingredients</Text>
          {ingredients.length === 0 && (
            <TouchableOpacity
              style={styles.btnIc}
              onPress={() => addIngredient()}>
              <Icon name="plus-circle" size={20} color={APP_COLORS.primary} />
            </TouchableOpacity>
          )}
          {formik.errors.ingredients && (
            <Text color={APP_COLORS.error} type="normal-13">
              {formik.errors.ingredients}{' '}
            </Text>
          )}
          {ingredients.map((ingredient, index) => (
            <View style={styles.inputingredeients} key={index}>
              <Text style={styles.indexIngredient} type="bold-16">
                {index + 1}
              </Text>

              <TextInput
                style={styles.ingredientsInput}
                placeholder={'   Item name'}
                placeholderTextColor={APP_COLORS.gray}
                value={ingredient.name}
                onChangeText={text => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = text;
                  setIngredients(newIngredients);
                }}
              />
              <TextInput
                style={styles.ingredientsInput2}
                placeholder={' (ghi đơn vị)'}
                placeholderTextColor={APP_COLORS.gray}
                value={ingredient.quantity}
                onChangeText={text => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].quantity = text;
                  setIngredients(newIngredients);
                }}
              />
              {index === ingredients.length - 1 ? (
                <TouchableOpacity style={styles.btnIc} onPress={addIngredient}>
                  <Icon
                    name="plus-circle"
                    size={15}
                    color={APP_COLORS.primary}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btnIc}
                  onPress={() => removeIngredient(index)}>
                  <Icon name="trash-alt" size={15} color={APP_COLORS.primary} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.addStepView}>
          <View>
            <Text type={'bold-14'}>Step</Text>
            {steps.length === 0 && (
              <TouchableOpacity style={styles.btnIc} onPress={() => addStep()}>
                <Icon name="plus-circle" size={20} color={APP_COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>

          <View>
            {steps?.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View>
                  <View style={styles.stepContainer}>
                    <View style={styles.stepNumberContainer}>
                      <Text type="bold-16" color={APP_COLORS.white}>
                        {step.number}
                      </Text>
                    </View>
                    <TextInput
                      multiline={true}
                      style={styles.stepInput}
                      placeholder="How to cooking"
                      placeholderTextColor={APP_COLORS.gray}
                      value={step?.content}
                      onChangeText={text => {
                        const newSteps = [...steps];
                        newSteps[index].content = text;
                        setSteps(newSteps);
                      }}
                    />
                  </View>
                </View>
                {index === steps.length - 1 ? (
                  <TouchableOpacity
                    style={styles.btnIc}
                    onPress={() => addStep(step, index)}>
                    <Icon
                      name="plus-circle"
                      size={20}
                      color={APP_COLORS.primary}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnIc}
                    onPress={() => removeStep(index)}>
                    <Icon
                      name="trash-alt"
                      size={15}
                      color={APP_COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
          {formik.errors.steps && (
            <Text color={APP_COLORS.error} type="normal-13">
              {formik.errors.steps}{' '}
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.btnSave} onPress={() => onCreate()}>
          <Text type="bold-16" color={APP_COLORS.white} style={styles.textsave}>
            Save My Receip
          </Text>
        </TouchableOpacity>
      </KeyboardContainer>
    </SafeAreaContainer>
  );
};
export default RecipeScreen;

const styles = StyleSheet.create({
  iconDelete: {height: 15, width: 15},
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
  imageCard: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  icPlayButton: {
    width: 50,
    height: 50,
  },
  playButtonView: {
    position: 'absolute',
    top: 80,
    right: 150,
  },
  thumnelYoutube: {
    padding: 10,
  },
  titlePickImage: {
    paddingVertical: 10,
  },
  category: {
    flexDirection: 'row',
  },

  categoryView: {
    backgroundColor: APP_COLORS.white,
    padding: 10,
  },
  checkboxContainer: {
    marginLeft: 60,
    marginTop: 10,
    marginBottom: 20,
  },
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
  addImageView: {
    backgroundColor: APP_COLORS.white,
    padding: 10,
    marginVertical: 10,
  },
  btnAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLORS.secondary,
    height: 95,
    width: 95,
    marginLeft: 8,
  },
  imageItem: {
    marginVertical: 10,
    marginHorizontal: 8,
  },
  viewAddImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textCategory: {},
  btnSave: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 40,
  },
  textsave: {
    color: APP_COLORS.white,
  },
  titleCreate: {
    alignSelf: 'center',
  },

  imageFood: {
    height: 95,
    width: 95,
  },
  cookTime: {
    flexDirection: 'row',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    flex: 1,
  },
  cookTimeView: {
    backgroundColor: APP_COLORS.white,
    marginVertical: 10,
    padding: 10,
  },
  inputPickTime: {
    width: SCREEN_WIDTH / 4,
    backgroundColor: APP_COLORS.neutral10,
    borderRadius: 5,
    height: 40,
    padding: 10,
  },
  inputingredeients: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: APP_COLORS.neutral10,
    padding: 5,
    marginVertical: 10,
  },
  ingredientsInput: {
    width: SCREEN_WIDTH / 3,
    marginVertical: 5,
    maxHeight: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: APP_COLORS.primary,
    padding: 10,
  },
  ingredientsInput2: {
    width: SCREEN_WIDTH / 4,
    maxHeight: 80,
    marginVertical: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: APP_COLORS.primary,
    padding: 10,
  },
  btnIc: {
    backgroundColor: APP_COLORS.white,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginLeft: 5,
  },
  ingredientsView: {
    backgroundColor: APP_COLORS.white,
    padding: 10,
  },
  indexIngredient: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  stepContainer: {
    flexDirection: 'row',
    padding: 24,
    backgroundColor: APP_COLORS.white,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: SCREEN_WIDTH - 40,
  },
  stepNumberContainer: {
    width: 40,
    height: 40,
    backgroundColor: APP_COLORS.black,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
    padding: 5,
  },

  stepInput: {
    minHeight: 100,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
    flex: 1,
    paddingHorizontal: 10,
    textAlign: 'left',
    borderRadius: 10,
  },
  addStepView: {
    backgroundColor: APP_COLORS.white,
    marginVertical: 20,
    padding: 10,
  },
});
