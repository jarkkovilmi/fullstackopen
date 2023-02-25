import { StyleSheet, View, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../Text';

const styles = StyleSheet.create({
  tab: {
		paddingHorizontal: 20
  }
});

const AppBarTab = ({ children, to, ...props }) => {
	const content = (
    <View>
      <Text style={styles.tab} color='textAppBar' fontWeight='bold' {...props}>
        {children}
      </Text>
    </View>
  );

	return to ? (
		<Link to={to} {...props}>
			{content}
		</Link>
		) : (
			<Pressable {...props}>{content}</Pressable>
		);
};

export default AppBarTab;