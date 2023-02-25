import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
	container: {
		marginLeft: 15
	}
});

const SortingMenu = ({ sorting, setSorting }) => {
	return (
		<Picker style={styles.container}
			selectedValue={sorting}
			onValueChange={(itemValue) =>
				setSorting(itemValue)
			}>
			<Picker.Item label="Latest repositories" value="latest" />
			<Picker.Item label="Highest rated repositories" value="rating_desc" />
			<Picker.Item label="Lowest rated repositories" value="rating_asc" />
		</Picker>
	);
};

export default SortingMenu;