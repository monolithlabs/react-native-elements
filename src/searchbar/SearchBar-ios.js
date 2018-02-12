import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import ViewPropTypes from '../config/ViewPropTypes';
import Input from '../input/Input';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IOS_GRAY = '#8e8e93';

class SearchBar extends Component {
  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClearText && this.props.onClearText();
  };

  cancel = () => {
    this.blur();
    this.props.onCancel && this.props.onCancel();
  };

  onFocus = () => {
    this.props.onFocus && this.props.onFocus();
    if (!this.props.hideCancelButton && UIManager.configureNextLayoutAnimation) {
      LayoutAnimation.easeInEaseOut();
    }
    this.setState({ hasFocus: true });
  };

  onBlur = () => {
    this.props.onBlur && this.props.onBlur();
    if (!this.props.hideCancelButton && UIManager.configureNextLayoutAnimation) {
      LayoutAnimation.easeInEaseOut();
    }
    this.setState({ hasFocus: false });
  };

  onChangeText = text => {
    this.props.onChangeText && this.props.onChangeText(text);
    this.setState({ isEmpty: text === '' });
  };

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      isEmpty: true,
    };
  }

  render() {
    const {
      hideCancelButton,
      cancelButtonTitle,
      clearIcon,
      containerStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputStyle,
      noIcon,
      placeholderTextColor,
      showLoading,
      loadingProps,
      ...attributes
    } = this.props;
    const { hasFocus, isEmpty } = this.state;
    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
    const searchIcon = (
      <Ionicon size={19} name={'ios-search'} color={IOS_GRAY} />
    );

    return (
      <View style={styles.container}>
        <Input
          {...attributes}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={input => (this.input = input)}
          inputStyle={[styles.input, inputStyle]}
          containerStyle={[
            styles.inputContainer,
            (!hasFocus || hideCancelButton) && { width: SCREEN_WIDTH - 16, marginRight: 8 },
            containerStyle,
          ]}
          leftIcon={noIcon ? undefined : leftIcon ? leftIcon : searchIcon}
          leftIconContainerStyle={[
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ]}
          placeholderTextColor={placeholderTextColor}
          rightIcon={
            <View style={{ flexDirection: 'row' }}>
              {showLoading && (
                <ActivityIndicator
                  style={[
                    clearIcon && !isEmpty && { marginRight: 10 },
                    loadingStyle,
                  ]}
                  {...otherLoadingProps}
                />
              )}
              {clearIcon &&
                !isEmpty && (
                  <Ionicon
                    name={'ios-close-circle'}
                    size={20}
                    color={IOS_GRAY}
                    onPress={() => this.clear()}
                  />
                )}
            </View>
          }
          rightIconContainerStyle={[
            styles.rightIconContainerStyle,
            rightIconContainerStyle,
          ]}
        />
        {!hideCancelButton && <Button title={cancelButtonTitle} onPress={this.cancel} />}
      </View>
    );
  }
}

SearchBar.propTypes = {
  hideCancelButton: PropTypes.bool,
  cancelButtonTitle: PropTypes.string,
  clearIcon: PropTypes.bool,
  loadingProps: PropTypes.object,
  noIcon: PropTypes.bool,
  showLoading: PropTypes.bool,
  onClearText: PropTypes.func,
  onCancel: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  leftIcon: PropTypes.object,
  leftIconContainerStyle: ViewPropTypes.style,
  rightIconContainerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  placeholderTextColor: PropTypes.string,
};

SearchBar.defaultProps = {
  hideCancelButton: false,
  cancelButtonTitle: 'Cancel',
  clearIcon: true,
  loadingProps: {},
  noIcon: false,
  showLoading: false,
  onClearText: null,
  onCancel: null,
  placeholderTextColor: IOS_GRAY,
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: '#d8d8d8',
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginLeft: 6,
    fontSize: 17
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 36,
    marginLeft: 8,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
});

export default SearchBar;
