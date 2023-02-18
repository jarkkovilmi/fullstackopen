import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = () => {
	return (
		<Pressable>
			<Text color={'textAppBar'}>Repositories</Text>
		</Pressable>
	);
};

export default AppBarTab;