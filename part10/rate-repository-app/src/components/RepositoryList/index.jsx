import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import React, { useState } from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import ItemSeparator from '../ItemSeparator';
import SortingMenu from './SortingMenu';
import SearchBar from './SearchBar';

export const RepositoryListContainer = ({
	repositories, sorting, setSorting, searchKeyword, setSearchKeyword, onEndReach
	}) => {
	const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
		<View>
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => (
					<Pressable onPress={() => navigate(`/${item.id}`)}>
						<RepositoryItem repository={item} />
					</Pressable>
				)}
        keyExtractor={item => item.id}
				ListHeaderComponent={() => (
					<>
						<SearchBar setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword} />
						<SortingMenu sorting={sorting} setSorting={setSorting} />
					</>
				)}
				onEndReached={onEndReach}
				onEndReachedThreshold={0.5}
			/>
		</View>
  );
};

const RepositoryList = () => {
	const [sorting, setSorting] = useState('latest');
	const [searchKeyword, setSearchKeyword] = useState('');
  const { repositories, fetchMore } = useRepositories({
		sortingMethod: sorting,
		searchKeyword,
		first: 8
  });

	const onEndReach = () => {
    fetchMore();
  };

  return (
		<RepositoryListContainer
			repositories={repositories}
			onEndReach={onEndReach}
			sorting={sorting}
			setSorting={setSorting}
			searchKeyword={searchKeyword}
			setSearchKeyword={setSearchKeyword}
		/>
	);
};

export default RepositoryList;