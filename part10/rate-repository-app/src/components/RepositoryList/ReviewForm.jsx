import { StyleSheet, View, Pressable } from 'react-native';
import FormikTextInput from '../FormikTextInput';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
		backgroundColor: '#FFF',
		padding: 15
  },
	input: {
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: theme.colors.mainBackground,
		borderRadius: 4,
		margin: 5,
		padding: 10
	},
	submit: {
		backgroundColor: theme.colors.primary,
		margin: 5,
		padding: 10,
		borderRadius: 4,
		alignItems: 'center'
	}
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
			<FormikTextInput
				style={styles.input}
				name="ownerName"
				placeholder="Repository owner name"
			/>
      <FormikTextInput
				style={styles.input}
				name="repositoryName"
				placeholder="Repository name"
			/>
      <FormikTextInput
				style={styles.input}
				name="rating"
				placeholder="Rating between 0 and 100"
			/>
      <FormikTextInput
				style={styles.input}
				name="text"
				placeholder="Review"
				multiline
			/>
      <Pressable style={styles.submit} onPress={onSubmit}>
        <Text fontWeight='bold' color='textAppBar'>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
