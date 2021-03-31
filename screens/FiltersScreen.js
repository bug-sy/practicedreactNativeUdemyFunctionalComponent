import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { HeaderButtons, Item  } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/actions/meals'

const FilterSwitch = props => {
    return (
        <View style = { styles.filterContainer }>
    <Text>
    {props.label}
    </Text>
    <Switch value  = { props.state } onValueChange =  { props.onChange } 
    thumbColor = { Colors.primaryColor }
    trackColor = {{ true : Colors.primaryColor }}
    />
    </View>
    )

}

const FiltersScreen = props =>{

    const { navigation } = props
const [isGlutenFree, setIsGlutenFree] = useState(false)
const [isLactoseFree, setIsLactoseFree] = useState(false)
const [isVegan, setIsVegan] = useState(false)
const [isVegetarian, setIsVegetarian] = useState(false)

const dispatch = useDispatch()

const saveFilters = useCallback(() => {
    const appliedFilters = {
        glutenFree : isGlutenFree,
        lactoseFree : isLactoseFree,
        vegan : isVegan,
        vegetarian : isVegetarian
    };

    dispatch(setFilters(appliedFilters))
},[isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

    useEffect (() => {
        navigation.setParams({save : saveFilters})
    },[saveFilters])

return(
    <View style = { styles.screen }>
    <Text style = { styles.title }>Available filter's / Restrictions</Text>
    <FilterSwitch label = "Gluten-Free" state = { isGlutenFree } onChange = { newValue => setIsGlutenFree(newValue) }/>
    <FilterSwitch label = "Lactose-Free" state = { isLactoseFree } onChange = { newValue => setIsLactoseFree(newValue) }/>
    <FilterSwitch label = "Vegan" state = { isVegan } onChange = { newValue => setIsVegan(newValue) }/>
    <FilterSwitch label = "Vegatarian" state = { isVegetarian } onChange = { newValue => setIsVegetarian(newValue) }/>
    </View>
)
}

FiltersScreen.navigationOptions = (navData) => {
    return{
    headerTitle  : 'Filtered Categories',
    headerLeft :( <HeaderButtons HeaderButtonComponent = { HeaderButton }>
                <Item title = "Menu" iconName = "ios-menu" onPress = {() => { navData.navigation.toggleDrawer()}} iconSize = { 35 } color = { 'black' }/>
                </HeaderButtons>
    ),
    headerRight : ( <HeaderButtons HeaderButtonComponent = { HeaderButton }>
                <Item title = "Save" iconName = "ios-save" onPress = { navData.navigation.getParam('save') } iconSize = { 35 } color = { 'black' }/>
                </HeaderButtons>
    ),
    
     }
}

const styles = StyleSheet.create({
screen : {
    flex : 1,
    alignItems : 'center'
},
filterContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    width : '80%',
    marginVertical : 10
},
title : { 
    fontFamily : "open-sans-bold",
    fontSize : 22,
    margin : 20,
    textAlign : 'center'
}
})

export default FiltersScreen