import { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import theme from '../../theme';

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
	const [debounce, setDebounce] = useState(searchKeyword);
	const [value] = useDebounce(debounce, 500);

	useEffect(() => {
		setSearchKeyword(value);
	}, [value]);

	return (
		<Searchbar
			placeholder='Search'
			onChangeText={(query) => setDebounce(query)}
      value={debounce}
			style={{ backgroundColor: 'white' }}
			inputStyle={theme.fontSizes.subheading}
			placeholderTextColor={theme.colors.textSecondary}
		/>
	);
};

export default SearchBar;
