import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import ItemSeparator from '../ItemSeparator';

export const RepositoryListContainer = ({ repositories }) => {
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
			/>
		</View>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;