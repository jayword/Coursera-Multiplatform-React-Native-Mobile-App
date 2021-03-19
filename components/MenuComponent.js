import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Tile } from 'react-native-elements';
//import { useKeepAwake } from 'expo-keep-awake';
//import { DISHES } from '../shared/dishes';
//import Dishdetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}


class Menu extends Component {
    //useKeepAwake();
    


    static navigationOptions = {
        title: 'Menu'
    }

    render() {

        const renderMenuItem = ({ item, index }) => {
            return (
                

                <Tile
                    key = { index }
                    title = { item.name }
                    caption = { item.description }
                    featured
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    imageSrc = {{ uri: baseUrl + item.image }}
                />

            );
        }
        const { navigate } = this.props.navigation;

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        } else if (this.props.dishes.errMess) {
            return (
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
					<View>
						<Text>{this.props.dishes.errMess}</Text>
					</View>
				</Animatable.View>
				
            );
        } else {
            return (
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
					<View>
						<FlatList
							data={this.props.dishes.dishes}
							renderItem={renderMenuItem}
							keyExtractor={item => item.id.toString()}
						/>
					</View>
				</Animatable.View>
            );
        }
    }
}

export default connect(mapStateToProps)(Menu);


{/*constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
    }*/}
{/* <ListItem bottomDivider onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                    {/*<Avatar title={item.name[0]} source={item.avatar_url && { uri: item.avatar_url }} />*
                    <Avatar source={require('./images/uthappizza.png')} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>*/}

