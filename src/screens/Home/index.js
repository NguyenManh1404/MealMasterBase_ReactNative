import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {Searchbar} from 'react-native-paper';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {commonQueryDetailFunction} from '../../api/appApi';
import {HOME_ENDPOINTS} from '../../api/home';
import {
  KeyboardContainer,
  LocalImage,
  SafeAreaContainer,
  Text,
} from '../../components';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import {APP_COLORS} from '../../themes/colors';
import {SCREEN_WIDTH} from '../../utils/constants';
import {getRandomColorHex, isURL} from '../../utils/helpers';
import DefaultTabBar from './components/DefaultTabBar';
import ListViewPopularCategory from './components/ListViewPopularCategory';
import PopularCreator from './components/PopularCreator';
import RecentRecipe from './components/RecentRecipe';
import TrendingNow from './components/TrendingNow';

const getRandomColorHe = getRandomColorHex();

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const [index, setIndex] = useState(0);
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  const userInfo = useSelector(state => state.auth.userInfo);

  const TabsMapping = useMemo(() => {
    return {
      BreakfastListView: {
        component: ListViewPopularCategory,
        title: 'Breakfast',
        url: HOME_ENDPOINTS.BREAKFAST,
        params: {index},
        isFromTabView: true,
      },
      LunchListView: {
        component: ListViewPopularCategory,
        title: 'Lunch',
        url: HOME_ENDPOINTS.LUNCH,
        params: {index},
        isFromTabView: true,
      },
      DinerListView: {
        component: ListViewPopularCategory,
        title: 'Diner',
        url: HOME_ENDPOINTS.DINER,
        // params: filterParams,
        isFromTabView: true,
      },
      DietListView: {
        component: ListViewPopularCategory,
        title: 'Diet',
        url: HOME_ENDPOINTS.DIET,
        params: {index},
        isFromTabView: true,
      },
    };
  }, [index]);

  const routes = useMemo(() => {
    return Object.keys(TabsMapping).map(key => ({key, ...TabsMapping[key]}));
  }, [TabsMapping]);

  const renderScene = SceneMap({
    BreakfastListView: TabsMapping.BreakfastListView.component,
    LunchListView: TabsMapping.LunchListView.component,
    DinerListView: TabsMapping.DinerListView.component,
    DietListView: TabsMapping.DietListView.component,
  });

  const renderTabBar = props => <DefaultTabBar {...props} scrollEnabled />;

  const {data: listRecipeRecent} = useQuery({
    queryKey: [{url: HOME_ENDPOINTS.RECENT}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res.recipes;
    },
  });

  const {data: listRecipeTrending, isLoading: isFechingTrending} = useQuery({
    queryKey: [{url: HOME_ENDPOINTS.TRENDING}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res.updatedTopRecipes;
    },
  });

  const {data: listCreator, isLoading: isFechingCreator} = useQuery({
    queryKey: [{url: HOME_ENDPOINTS.CREATOR}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res?.data;
    },
  });

  const renderRecentItem = ({item, _index}) => {
    return (
      <RecentRecipe
        id={item?._id}
        key={_index}
        name={item?.name}
        images={item?.images}
        creatorName={item?.creatorName}
      />
    );
  };

  const renderCreatorItem = ({item, _index}) => {
    return <PopularCreator item={item} key={_index} />;
  };

  const renderTrendingItem = ({item, _index}) => {
    return (
      <TrendingNow
        key={_index}
        id={item?._id}
        name={item?.recipe.name}
        images={item?.recipe?.images[0]}
        creatorName={item?.creatorName}
        count={item?.count}
        isFavorite={item?.isFavorited}
        linkVideo={item?.recipe.linkVideo}
        authorFirstName={item?.authorFirstName}
        authorAvatar={item?.authorAvatar}
      />
    );
  };

  useRefreshOnFocus(() => {
    queryClient.invalidateQueries({
      queryKey: [{url: HOME_ENDPOINTS.BREAKFAST}],
    });
    queryClient.invalidateQueries({
      queryKey: [{url: HOME_ENDPOINTS.LUNCH}],
    });
    queryClient.invalidateQueries({
      queryKey: [{url: HOME_ENDPOINTS.DINER}],
    });
    queryClient.invalidateQueries({
      queryKey: [{url: HOME_ENDPOINTS.DIET}],
    });
    queryClient.invalidateQueries({
      queryKey: [{url: HOME_ENDPOINTS.RECENT}],
    });
    queryClient.invalidateQueries({
      queryKey: [{url: HOME_ENDPOINTS.TRENDING}],
    });
  });

  const onIndexChange = tabIndex => {
    setIndex(tabIndex);
    switch (tabIndex) {
      case 0:
        queryClient.invalidateQueries({
          queryKey: [{url: HOME_ENDPOINTS.BREAKFAST}],
        });
        break;
      case 1:
        queryClient.invalidateQueries({
          queryKey: [{url: HOME_ENDPOINTS.LUNCH}],
        });
        break;
      case 2:
        queryClient.invalidateQueries({
          queryKey: [{url: HOME_ENDPOINTS.DINER}],
        });
        break;
      case 3:
        queryClient.invalidateQueries({
          queryKey: [{url: HOME_ENDPOINTS.DIET}],
        });
        break;
      default:
        break;
    }
  };
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaContainer isLoading={isFechingTrending || isFechingCreator}>
      <KeyboardContainer>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.userView}>
              {userInfo?.avatar ? (
                <Image
                  source={{
                    uri: isURL(userInfo?.avatar)
                      ? userInfo?.avatar
                      : `${Config.BASE_URL_API}/public/${userInfo?.avatar}`,
                  }}
                  style={styles.defaultAvatar}
                />
              ) : (
                <View
                  style={[
                    styles.defaultAvatar,
                    {backgroundColor: getRandomColorHe},
                  ]}>
                  <Text type={'bold-20'} color={APP_COLORS.white}>
                    {userInfo?.firstName?.charAt(0)?.toUpperCase()}
                  </Text>
                </View>
              )}
              <Text style={styles.userName} type="bold-16">
                {userInfo.firstName} {userInfo.lastName && userInfo.lastName}
              </Text>
            </View>
            <View style={styles.youCanMakeView}>
              <Text style={styles.youCanMakeTxt} type="bold-32">
                Here’s what you can make ?
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <LocalImage
              imageKey={'imageBlobHome'}
              style={styles.imageBlobHome}
            />
          </View>
        </View>

        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.search}
        />

        {listRecipeTrending && (
          <View style={styles.trendingView}>
            <View style={styles.trendingTitleView}>
              <Text style={styles.trendingTitleTxt} type={'bold-20'}>
                Trending now 🔥
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigate('ListView');
                }}>
                <Text
                  style={styles.trendingTitleTxt}
                  type={'bold-14'}
                  color={APP_COLORS.primary}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={listRecipeTrending}
              renderItem={renderTrendingItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(__, _index) => `${_index}`}
            />
          </View>
        )}

        <View style={styles.popularCategoryView}>
          <View style={styles.trendingTitleView}>
            <Text style={styles.trendingTitleTxt} type={'bold-20'}>
              Popular category
            </Text>
          </View>
          <TabView
            key={index}
            navigationState={{index, routes}}
            lazy // focus that
            swipeEnabled={false}
            renderScene={renderScene}
            onIndexChange={onIndexChange}
            initialLayout={{width: SCREEN_WIDTH}}
            renderTabBar={renderTabBar}
          />
        </View>

        {listRecipeRecent && (
          <View style={styles.recentView}>
            <View style={styles.trendingTitleView}>
              <Text style={styles.trendingTitleTxt} type={'bold-20'}>
                Recent recipes
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigate('ListView');
                }}>
                <Text
                  style={styles.trendingTitleTxt}
                  type={'bold-14'}
                  color={APP_COLORS.primary}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={listRecipeRecent}
              renderItem={renderRecentItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(__, _index) => `${_index}`}
            />
          </View>
        )}

        <View style={styles.popularCreatorsView}>
          <View style={styles.trendingTitleView}>
            <Text style={styles.trendingTitleTxt} type={'bold-20'}>
              Popular creators
            </Text>
          </View>

          <FlatList
            data={listCreator}
            renderItem={renderCreatorItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(__, _index) => `${_index}`}
          />
        </View>
      </KeyboardContainer>
    </SafeAreaContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  popularCategoryView: {paddingHorizontal: 20, height: 360, marginBottom: 10},

  popularCreatorsView: {
    paddingHorizontal: 20,
  },
  recentView: {
    paddingHorizontal: 20,
    height: 250,
  },

  trendingView: {
    paddingHorizontal: 20,
    height: 322,
  },
  trendingTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  headerLeft: {
    flex: 4,
  },
  headerRight: {
    flex: 1,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 20,
  },
  imageBlobHome: {
    height: 150,
    width: 80,
  },
  youCanMakeTxt: {
    marginTop: 20,
  },

  defaultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLORS.blue,
  },
  search: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

//https://github.com/valdio/react-native-scrollable-tabview
