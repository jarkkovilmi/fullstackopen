import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
	errorBorder: {
		borderColor: theme.colors.error
	}
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
	if (error) textInputStyle.push(styles.errorBorder);

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;