import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
//import { ListItem } from 'react-native-elements';
//import { useKeepAwake } from 'expo-keep-awake';
//import { DISHES } from '../shared/dishes';
//import Dishdetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
		favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
	deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component{
	
	static navigationOptions = {
	title: 'My Favorites'
	}

	render(){
		const{navigate} = this.props.navigation;
		
		const renderMenuItem = ({item, index}) => {
			
			const rightButton =[{
				text: 'Delete',
				type: 'delete',
				onPress: () => {
					Alert.alert(
						'Delete Favorite?',
						'Are you sure you wish to delete the favorite dish' + item.name + '?',
						[
						{
						text: 'Cancel', 
						onPress: () => console.log(item.name + 'Not Deleted'),
						style: 'cancel'
						},
						{
						text: 'OK',
						onPress: () => this.props.deleteFavorite(item.id)
						}
						],
						{cancelable: false}
					)
				}
			}];
			
			return(
				<Swipeout right={rightButton} autoClose={true}>
					<ListItem
					key={index}
					title={item.name}
					subtitle={item.description}
					hideChevron={true}
					onPress={() => navigate('Dishdetail',{dishId: item.id})}
					leftAvatar={{source: {uri: baseUrl + item.image}}}
					/>
				</Swipeout>
			);
		}
		if(this.props.dishes.isLoading){
			return(
				<Loading />
			);
		}else if(this.props.dishes.errMess){
			return(
				<Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
					<View>
						<Text>{this.props.dishes.errMess}</Text>
					</View>
				</Animatable.View>
			);
		}else{
			return(
				<Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
					<FlatList 
						data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
						renderItem={renderMenuItem}
						keyExtractor={item => item.id.toString()}
					/>
				</Animatable.View>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
