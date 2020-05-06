import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MealList from '../components/MealList'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item  } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const FavoritesScreen = props =>{
    const favMeals = useSelector(state => state.meals.favoriteMeals)
    
    if(favMeals.length === 0 || !favMeals){
        return (
            <View style = { styles.content }>
            <Text>
            
            No favorite Meals found, start adding some !
            
            </Text>
            </View>
        )
    }

return(



<MealList listData = { favMeals } navigation = { props.navigation }/>
)
}

FavoritesScreen.navigationOptions = (navData) => {
    return{
    headerTitle  : 'Favourite Categories',
    headerLeft :( <HeaderButtons HeaderButtonComponent = { HeaderButton }>
                <Item title = "Menu" iconName = "ios-menu" onPress = {() => { navData.navigation.toggleDrawer()}} iconSize = { 35 }/>
                </HeaderButtons>
    )}
}

const styles = StyleSheet.create({
    content : {
        justifyContent : 'center',
        flex : 1,
        alignItems : 'center'
    }
})

export default FavoritesScreen