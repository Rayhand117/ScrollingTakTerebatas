/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
// import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = () => {
    setIsLoading(true);
    axios
      .get(`https://randomuser.me/api/?page=${currentPage}&results=2`)
      .then(res => {
        // setUsers(res.data.results);
        setUsers([...users, ...res.data.results]);
        setIsLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <Image
          style={styles.itemImageStyle}
          source={{uri: item.picture.large}}
        />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>
            {`${item.name.title} ${item.name.first} ${item.name.last}`}
          </Text>
          <Text style={styles.txtAddress}>
            {`${item.location.street.number}, ${item.location.street.name}, ${item.location.state}`}
          </Text>
          <Text style={styles.txtEmailStyle}>{item.email}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Text style={styles.titleStyle}>Customers</Text>
      {/* <View style={styles.testViewStyle}> */}
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.email}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: 'hsl(96, 10%, 92%)',
    marginBottom: 20,
    overflow: 'hidden',
    // borderBottomWidth: 10,
    // borderColor: 'green',
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
  // testViewStyle: {
  //   backgroundColor: 'green',
  // },
  safeAreaStyle: {
    backgroundColor: 'hsl(106, 13%, 50%)',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemImageStyle: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 5,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  txtAddress: {
    color: 'black',
  },
  txtEmailStyle: {
    color: 'hsl(324, 32%, 50%)',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default App;
