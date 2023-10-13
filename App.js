import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {
  Button,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const formatReactQueryList = (data, key = 'data') => {
  if (data?.pages) {
    return (data?.pages || [])
      .map(page => {
        return page[key];
      })
      .flat();
  }
  return [];
};

const User = () => {
  //Fetch list
  const fetchUsers = async () => {
    const response = await axios.get(
      'https://6514fb42dc3282a6a3cdb0e1.mockapi.io/users',
    );
    return response?.data;
  };
  //Get with per page
  const fetchData = async ({page, perPage}) => {
    const response = await axios.get(
      `https://mastermeal.onrender.com/api/auth/get_per_page?page=${page}&perPage=${perPage}`,
    );
    return response.data;
  };

  //Create
  const createUsers = async data => {
    const response = await axios.post(
      'https://6514fb42dc3282a6a3cdb0e1.mockapi.io/users',
      data,
    );
    refetch();
    refetchPage();
  };

  //Delete users
  const deleteUserById = async id => {
    const response = await axios.delete(
      `https://6514fb42dc3282a6a3cdb0e1.mockapi.io/users/${id}`,
    );
    return response?.data;
  };

  //// API API API
  //// API API API
  //// API API API

  //[useQuery]
  const {
    data: dataUser,
    error,
    isLoading,
    status,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    cacheTime: 0,
    // refetchOnReconnect: 'always',
    // refetchInterval: 2000,
  });

  //[useMutation]
  const {mutateAsync: DeleteUser} = useMutation(deleteUserById, {
    onSuccess: () => {
      refetch();
      refetchPage();
    },
  });

  const {mutateAsync: CreateUser} = useMutation(createUsers, {
    onSuccess: () => {
      refetch();
      refetchPage();
    },
  });

  //[useQueryClient]
  const queryClient = useQueryClient();

  const invalidateQueriesUser = async () => {
    queryClient.invalidateQueries({queryKey: ['users']});
  };

  //  queryClient.cancelQueries({ queryKey: ['users'] })
  //const previousTodos = queryClient.getQueryData['users'];

  const getQueryDataUser = () => {
    const previousTodos = queryClient.getQueryData(['users']);
  };

  const setQueryDataUser = () => {
    queryClient.setQueryData(['users'], [...dataUser, {name: 'manh'}]);
  };

  //[useInfiniteQuery]
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data: dataUserPerPage,
    remove,
    refetch: refetchPage,
    status: statusPage,
  } = useInfiniteQuery({
    queryKey: [
      {
        url: 'https://mastermeal.onrender.com/api/auth/get_per_page',
        perPage: 5,
      },
    ],
    onSuccess: () => {
      console.log('statusPage:', statusPage);
    },
    queryFn: ({queryKey, pageParam = 1}) =>
      fetchData({page: pageParam, perPage: queryKey[0].perPage}),
    getNextPageParam: (lastPage, pages) => {
      const {page, totalItem, perPage} = lastPage || {};
      const currentPage = page || pages.length;

      if (currentPage < Math.ceil(totalItem / perPage)) {
        return Number(currentPage) + 1;
      }

      return undefined;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User List {status} </Text>
        {isFetching ? <Text>Fetching</Text> : <Text>Fetched</Text>}
        <Button
          title="AddNew"
          onPress={() => {
            CreateUser({
              name: `Demo add id =${Math.random()
                .toString(36)
                .substring(2, 6)}`,
              id: Math.random().toString(),
            });
          }}
          color="green"
        />
        {/* <Button
          title="Get"
          // onPress={() => {
          //   CreateUser({
          //     name: `Demo add id =${Math.random()
          //       .toString(36)
          //       .substring(2, 6)}`,
          //     id: Math.random().toString(),
          //   });
          // }}
          onPress={getQueryDataUser}
          color="orange"
        /> */}
      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <FlatList
          data={formatReactQueryList(dataUserPerPage)} //formatReactQueryList(dataUserPerPage)
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.userContainer}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
              <Text>{item.name}</Text>
              <Button
                title="Delete"
                onPress={() => DeleteUser(item.id)}
                color="red"
              />
            </View>
          )}
        />
      )}
      {hasNextPage && (
        <Button title="get" onPress={fetchNextPage} color={'red'} />
      )}
    </SafeAreaView>
  );
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <User />
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {},
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});
