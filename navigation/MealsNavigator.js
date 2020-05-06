
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import Colors from '../constants/Colors'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import FavoritesScreen from '../screens/FavoritesScreen'
import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import  FiltersScreen  from '../screens/FiltersScreen'

const defaultStackNavOptions = {
  
    headerStyle : {
        backgroundColor : Platform.OS === 'android' ? Colors.primaryColor  : Colors.accentColor
    },
    headerTitleStyles : {
      fontFamily : 'open-sans-bold'
    },
    headerBackTitleStyle : {
      fontFamily : 'open-sans'
    },
    headerTintColor : Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealsNavigator = createStackNavigator({
  Categories  : {
     screen : CategoriesScreen,  
  },
 CategoryMeals: {
    screen : CategoryMealsScreen,
  },
  MealDetail:{
   screen : MealDetailScreen, 
  },
 
},{
    defaultNavigationOptions : defaultStackNavOptions
});



const FavNavigator = createStackNavigator({
  Favorites : {
    screen : FavoritesScreen
  },
  MealDetail : {
    screen : MealDetailScreen
  },
},
  {
    defaultNavigationOptions : defaultStackNavOptions 
}
)



const tabScreenConfig = {
  Meals : {
    screen : MealsNavigator, navigationOptions : {
      tabBarIcon : (tabInfo) => { 
        return <Ionicons name = 'ios-restaurant' size ={25}  color = { tabInfo.tintColor }/>
       },
       tabBarColor : Colors.primaryColor,
       tabBarLabel : <Text style = {{ fontFamily : 'open-sans-bold' }}> Meals </Text>
    }
  },
  Favorites : { 
    screen : FavNavigator, navigationOptions : {
      tabBarIcon : (tabInfo) => { 
        return <Ionicons name = 'ios-star' size ={25}  color = { tabInfo.tintColor }/>
       },
       tabBarColor : Colors.accentColor,
      tabBarLabel : <Text style = {{ fontFamily : 'open-sans-bold' }}> Favourites </Text>
    } 
    }

}

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig,{
  activeColor : 'white',
  shifting : true
}) :  createBottomTabNavigator(
  tabScreenConfig ,{
  tabBarOptions : {
    labelStyle : {
      fontFamily : 'open-sans-bold'
    },
    activeTintColor : Colors.accentColor
  }
})

const FiltersNavigator = createStackNavigator({

  Filters : FiltersScreen

}
,
  {
    defaultNavigationOptions : defaultStackNavOptions 
})

const MainNavigator = createDrawerNavigator({
  MealsFavs : {
    screen : MealsFavTabNavigator, navigationOptions : { drawerLabel : 'Meals'}
  },
  Filters : {
    screen : FiltersNavigator
  },

},{
  contentOptions : {
    activeTintColor : Colors.accentColor,
    labelStyle : {
      fontFamily : 'open-sans-bold'
    }
  }
})

export default createAppContainer(MainNavigator);