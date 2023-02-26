import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './RepositoryList/SingleRepository';
import Review from './RepositoryList/Review';
import SignUp from './SignUp/SignUp';
import UserReviews from './RepositoryList/UserReviews';

const styles = StyleSheet.create({
  container: {
		backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
			<AppBar />
			<Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/review" element={<Review />} exact />
        <Route path="/myreviews" element={<UserReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;