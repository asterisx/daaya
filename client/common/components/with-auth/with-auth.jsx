// @flow

import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {View} from 'react-native';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  createButton,
} from 'react-social-login-buttons';

import ScreenLoader from '../screen-loader';

const AppleLoginButton = createButton({
  text: 'Login with Apple',
  icon: 'apple',
  iconFormat: name => `fa fa-${name}`,
  style: {background: '#1c1616'},
  activeStyle: {background: '#000000'},
});

const EmailLoginButton = createButton({
  text: 'Login with Email',
  icon: 'envelope',
  iconFormat: name => `fa fa-${name}`,
  style: {background: '#467cb0'},
  activeStyle: {background: '#195792'},
});

const withAuth = ({
  Component,
  Message,
}: {
  Component: *,
  Message: *,
}): (() => React$Node) => (props: *): React$Node => {
  const [hasResponse, setHasResponse] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(undefined);

  useState(() => {
    Auth.currentUserInfo()
      .then(({username}) => {
        setUser(username);
        setSignedIn(true);
        setHasResponse(true);
      })
      .catch(() => {
        setSignedIn(false);
        setHasResponse(true);
      });
  });

  return user ? (
    <Component {...props} user={user} />
  ) : hasResponse && !signedIn ? (
    <View>
      <Message />
      <GoogleLoginButton
        onPress={() => Auth.federatedSignIn({provider: 'Google'})}
      />
      <FacebookLoginButton
        title="Sign in with Facebook"
        onPress={() => Auth.federatedSignIn({provider: 'Facebook'})}
      />
      <AppleLoginButton
        onPress={() => Auth.federatedSignIn({provider: 'Apple'})}
      />
      <EmailLoginButton onPress={() => Auth.federatedSignIn()} />
    </View>
  ) : (
    <ScreenLoader />
  );
};

export default withAuth;
