import {useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {commonQueryDetailFunction} from '../../api/appApi';
import {CHAT, addNewMessageApi} from '../../api/chat';
import {SafeAreaContainer, Text} from '../../components';
import {APP_COLORS} from '../../themes/colors';
import {SCREEN_WIDTH} from '../../utils/constants';
import {showSystemAlert} from '../../utils/helpers';

const ChatScreen = () => {
  const route = useRoute();
  const {idUserReceive} = route.params || {};

  const [content, setContent] = useState();
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
    onSuccess: data => {
      console.log('gọi list');
    },
    select: res => {
      return res?.data;
    },
    refetchInterval: 5000,
  });

  const onCreate = () => {
    Keyboard.dismiss();
    textInputRef.current?.clear();
    setContent();

    if (content) {
      addNewMessage({
        idUserReceive: idUserReceive,
        content: content,
        images: [],
      });
    }

    // formik.handleSubmit();
  };

  // const formik = useFormik({
  //   initialValues: {
  //     idUserReceive: idUserReceive,
  //     content: EMPTY_STRING,
  //     images: [],
  //   },
  //   validationSchema: Yup.object({
  //     // idUserReceive: Yup.string().required('idUserReceive is require'),
  //     content: Yup.string()
  //       .required('Content is require')
  //       .min(3, ' Content from 6-20 characters'),
  //   }),
  //   onSubmit: values => {
  //     addNewMessage(values);
  //   },
  // });

  const ChatItem = ({item}) => {
    return (
      <View style={styles.messageContent}>
        {item?.senderId === userInfo?._id ? (
          <View style={styles.rightMessage}>
            <View style={styles.itemRightMessage}>
              <Text style={styles.txtRightMessage} color={APP_COLORS.white}>
                {item?.content}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.leftMessage}>
            <View style={styles.itemLeftMessage}>
              <Text style={styles.txtLeftMessage} color={APP_COLORS.white}>
                {item?.content}
              </Text>
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
        <Text type="bold-16">Your Message</Text>
      </View>

      <FlatList
        data={listChats?.messages || []}
        inverted
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(__, index) => `${index}`}
        // contentContainerStyle={{flexDirection: 'column-revrse'}}
        contentContainerStyle={{flexDirection: 'column-reverse'}}
      />
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}>
        <View style={styles.inputMessageView}>
          <TouchableOpacity>
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
          {/* <Input
            required
            style={styles.input}
            multiline={true}
            onChangeText={formik.handleChange('content')}
            onBlur={formik.handleBlur('content')}
            error={formik.errors.email}
            defaultValue={formik.values.email}
            placeholder={'Enter your message '}
            returnKeyType="done"
          /> */}
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
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  messageContent: {
    marginHorizontal: 20,
  },
  header: {
    alignSelf: 'center',
    padding: 10,
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
    backgroundColor: APP_COLORS.primary,
    minHeight: 100,
    padding: 10,
    borderTopWidth: 1,
    borderColor: APP_COLORS.greyL2,
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
  input: {
    width: SCREEN_WIDTH - 100,
    marginHorizontal: 10,
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
});
