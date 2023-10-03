import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {commonQueryDetailFunction} from '../../../api/appApi';
import {HOME_ENDPOINTS} from '../../../api/home';
import {LocalImage, Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';
import RecentRecipe from '../../Home/components/RecentRecipe';

const Ingredients = ({data, updateTabHeight}) => {
  const [btnFollow, setbtnFollow] = useState(false);
  const onChangeButton = () => {
    setbtnFollow(!btnFollow);
  };

  const {data: listRecipeRecent} = useQuery({
    queryKey: [{url: HOME_ENDPOINTS.RECENT}],
    queryFn: commonQueryDetailFunction,
    select: res => {
      return res.recipes;
    },
  });

  const renderRecentItem = ({item, index}) => {
    return (
      <RecentRecipe
        id={item?._id}
        key={index}
        name={item?.name}
        images={item?.images}
        creatorName={item?.creatorName}
      />
    );
  };

  return (
    <View style={styles.parent} onLayout={updateTabHeight}>
      <View style={styles.content}>
        <View style={styles.viewuser}>
          <Image
            source={{
              uri: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/e2a18673-2343-4a9f-b6bd-02c8df7b9ee0.jpg',
            }}
            style={styles.imageuser}
          />
          <View style={styles.contain}>
            <Text style={styles.textname} type="bold-16">
              {/* {userInfo.firstName} {userInfo.lastName && userInfo.lastName} */}
              Mah nGuyen
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onChangeButton}>
          {btnFollow ? (
            <View style={styles.ViewbtnFl}>
              <Text style={styles.textbtnFl} type="bold-14">
                Follow
              </Text>
            </View>
          ) : (
            <View style={styles.ViewbtnFl1}>
              <Text style={styles.textbtnFl1} type="bold-14">
                Following
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.ingredies} type="bold-16">
          Ingredients
        </Text>
        {data?.ingredients.map((ingredient, index) => {
          return (
            <View style={styles.row} key={index}>
              <LocalImage style={styles.iconCalo} imageKey={'logo'} />
              <Text style={styles.textIngredients}>{ingredient?.name}</Text>
            </View>
          );
        })}
      </View>
      <View>
        <Text style={styles.textPreparation} type="bold-16">
          Preparation
        </Text>
        <View style={styles.viewtotal}>
          <View>
            <Text style={styles.texttotal} type="bold-14">
              Preparation time
            </Text>
            <Text style={styles.textIngredients}>{data?.cookTime} min</Text>
          </View>
          <View>
            <Text style={styles.texttotal} type="bold-14">
              Cook time
            </Text>
            <Text style={styles.textIngredients}>{data?.cookTime} min</Text>
          </View>
          <View>
            <Text style={styles.texttotaltime} type="bold-16">
              Total time
            </Text>
            <Text style={styles.textIngredients}>
              {data?.cookTime + data?.cookTime} min
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.TEXT1} type="bold-16">
          Recent recipes
        </Text>
        <FlatList
          data={listRecipeRecent}
          renderItem={renderRecentItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(__, index) => `${index}`}
        />
      </View>
    </View>
  );
};

export default Ingredients;

const styles = StyleSheet.create({
  viewuser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageuser: {
    width: 42,
    height: 39,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textIngredients: {
    color: APP_COLORS.black,
  },

  contain: {
    marginLeft: 12,
  },
  TEXT1: {
    marginTop: 20,
    marginBottom: 10,
  },
  textbtnFl1: {
    letterSpacing: 1,
    opacity: 0.8,
    color: APP_COLORS.primary,
  },
  ViewbtnFl: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderColor: APP_COLORS.grey,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    backgroundColor: APP_COLORS.primary,
  },
  ViewbtnFl1: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderColor: APP_COLORS.grey,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    backgroundColor: APP_COLORS.white,
  },
  textbtnFl: {
    opacity: 0.8,
    padding: 5,
    color: APP_COLORS.white,
  },

  ingredies: {
    color: APP_COLORS.black,
    marginVertical: 20,
  },
  content: {},
  texttotaltime: {
    color: APP_COLORS.black,
  },

  textPreparation: {
    marginVertical: 20,
    color: APP_COLORS.black,
  },
  texttotal: {
    color: APP_COLORS.black,
  },
  viewtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconCalo: {
    width: 38,
    height: 38,
  },
  textname: {
    color: APP_COLORS.black,
  },
});
