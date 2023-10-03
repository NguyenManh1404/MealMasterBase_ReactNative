import messaging from '@react-native-firebase/messaging';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {commonQueryDetailFunction} from '../../api/appApi';
import {CHAT, addNewMessageApi} from '../../api/chat';
import {LocalImage, SafeAreaContainer, Text} from '../../components';
import {useMediaPicker} from '../../hooks/useMediaPicker';
import {APP_COLORS} from '../../themes/colors';
import {SCREEN_WIDTH} from '../../utils/constants';
import {showSystemAlert} from '../../utils/helpers';

const ChatScreen = () => {
  const route = useRoute();
  const {goBack} = useNavigation();
  const {idUserReceive} = route.params || {};

  const [content, setContent] = useState();

  const [images, setImages] = useState([]);

  const textInputRef = useRef();

  const userInfo = useSelector(state => state.auth.userInfo);

  const {mutateAsync: addNewMessage, isLoading: addNewMessgaeLoading} =
    useMutation(addNewMessageApi, {
      onSuccess: res => {
        refetch();
      },
      onError: error => {
        showSystemAlert({
          message: error,
        });
      },
    });

  const {
    data: listChats,
    isLoading: isFetchingListChats,
    refetch,
  } = useQuery({
    queryKey: [{url: CHAT.GET_CHAT_WITH_ID.replace('ID', idUserReceive)}],
    queryFn: commonQueryDetailFunction,
    onSuccess: data => {},
    select: res => {
      return res?.data;
    },
    // refetchInterval: 5000,
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      refetch();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {showImagePickerOptions} = useMediaPicker(imageResult => {
    if (imageResult?.payload.filename) {
      setImages([...images, imageResult?.payload.filename]);
    }
  });

  const pickImage = () => {
    showImagePickerOptions();
  };

  const onRemoveImage = index => {
    let item = [...images];
    item.splice(index, 1);
    setImages([...item]);
  };

  const onCreate = () => {
    Keyboard.dismiss();
    textInputRef.current?.clear();
    setContent();
    setImages([]);

    if (content) {
      addNewMessage({
        idUserReceive: idUserReceive,
        content: content,
        images: images,
      });
    }
  };

  const ChatItem = ({item}) => {
    return (
      <View style={styles.messageContent}>
        {item?.senderId === userInfo?._id ? (
          <View style={styles.rightMessage}>
            <View style={styles.itemRightMessage}>
              <Text style={styles.txtRightMessage} color={APP_COLORS.white}>
                {item?.content}
              </Text>
              <View style={styles.viewAddImage}>
                {item?.images.map((image, index) => {
                  return (
                    <View key={index} style={styles.imageItem}>
                      <Image
                        source={{
                          uri: `${Config.BASE_URL_API}/public/${image}`,
                        }}
                        style={styles.imageFood2}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.leftMessage}>
            <View style={styles.itemLeftMessage}>
              <Text style={styles.txtLeftMessage} color={APP_COLORS.white}>
                {item?.content}
              </Text>
              <View style={styles.viewAddImage}>
                {item?.images.map((image, index) => {
                  return (
                    <View key={index} style={styles.imageItem}>
                      <Image
                        source={{
                          uri: `${Config.BASE_URL_API}/public/${image}`,
                        }}
                        style={styles.imageFood2}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return <ChatItem item={item} key={index} />;
  };

  const onChangeText = value => {
    setContent(value.trim());
  };

  return (
    <SafeAreaContainer loading={isFetchingListChats}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.viewBackIcon} onPress={goBack}>
          <LocalImage
            imageKey={'icCaretLeftx24'}
            style={styles.backIconLogin}
          />
        </TouchableOpacity>
        <Text type="bold-16">Your Message</Text>
        <View />
      </View>

      <FlatList
        data={listChats?.messages || []}
        inverted
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(__, index) => `${index}`}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}>
        <View style={styles.senderView}>
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
          </View>
          <View style={styles.inputMessageView}>
            <TouchableOpacity onPress={pickImage}>
              <Icon
                name="camera"
                size={25}
                color={APP_COLORS.messBackground}
                solid
              />
            </TouchableOpacity>

            <TextInput
              ref={textInputRef}
              onChangeText={onChangeText}
              textAlignVertical="center"
              placeholder={'Enter your message'}
              multiline
              style={styles.input}
              returnKeyType="done"
            />
            {!addNewMessgaeLoading && (
              <TouchableOpacity onPress={() => onCreate()}>
                <Icon
                  name="send"
                  size={25}
                  color={APP_COLORS.messBackground}
                  solid
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {flexDirection: 'column-reverse'},
  messageContent: {
    marginHorizontal: 20,
  },
  header: {
    // alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftMessage: {
    maxWidth: SCREEN_WIDTH / 1.5,
    alignSelf: 'flex-start',
  },
  itemLeftMessage: {
    backgroundColor: APP_COLORS.greyL2,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  rightMessage: {
    maxWidth: SCREEN_WIDTH / 1.5,
    alignSelf: 'flex-end',
  },
  itemRightMessage: {
    backgroundColor: APP_COLORS.messBackground,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  inputMessageView: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingBottom: 10,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },
  senderView: {
    backgroundColor: APP_COLORS.primary,
    minHeight: 100,
    padding: 10,
    borderTopWidth: 1,
    borderColor: APP_COLORS.greyL2,
  },
  input: {
    width: SCREEN_WIDTH - 100,
    marginHorizontal: 10,
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  imageFood: {
    width: 70,
    height: 70,
  },
  imageFood2: {
    width: SCREEN_WIDTH / 4,
    height: 100,
  },
  imageItem: {
    marginVertical: 10,
    marginHorizontal: 8,
  },
  iconDelete: {height: 10, width: 10},
  icDelete: {
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 1,
    top: -10,
    backgroundColor: APP_COLORS.white,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  viewAddImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  backIconLogin: {width: 25, height: 25},
});
