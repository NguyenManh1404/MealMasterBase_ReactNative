import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyboardContainer = ({children, ...props}) => {
  return (
    <KeyboardAwareScrollView
      {...props}
      enableResetScrollToCoords={false}
      keyboardShouldPersistTaps={'handled'}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardContainer;
