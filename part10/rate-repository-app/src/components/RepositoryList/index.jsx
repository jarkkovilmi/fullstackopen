import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import ItemSeparator from '../ItemSeparator';
import SortingMenu from './SortingMenu';

export const RepositoryListContainer = ({ repositories, sorting, setSorting }) => {
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
					<SortingMenu sorting={sorting} setSorting={setSorting} />
				)}
			/>
		</View>
  );
};

const RepositoryList = () => {
	const [sorting, setSorting] = useState('latest');
  const { repositories } = useRepositories({
    sortingMethod: sorting
  });

  return (
		<RepositoryListContainer
			repositories={repositories}
			sorting={sorting}
			setSorting={setSorting}
		/>
	);
};

export default RepositoryList;