import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
//import { LEADERS } from '../shared/leaders';
//import { PROMOTIONS } from '../shared/promotions';
//import { DISHES } from '../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { Animated, Easing } from 'react-native';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

function RenderItem(props) {
    const item = props.item;

    if (props.isLoading) {
        return (
            <Loading />
        );
    } else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    } else {
        if (item != null) {
            return (
                <Card>
                    {/*<Card.Title>{item.name}</Card.Title>
                <Card.Divider />*/}
                    <Card.Image source={{ uri: baseUrl + item.image }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingTop: 60 }}>{item.name}</Text>
                    </Card.Image>
                    <View>
                        <Text style={{ margin: 10 }}>{item.description}</Text>
                    </View>
                </Card>

            );
        } else {
            return (
                <View></View>
            );

        }
    }

    
}


class Home extends Component{

   constructor(props){
		super(props);
		this.animatedValue = new Animated.Value(0)
	}

    static navigationOptions = {
        title: 'Home'
    }
	
	componentDidMount(){
		this.animate();
	}
	
	animate(){
		this.animatedValue.setValue(0);
		Animated.timing(
			this.animatedValue,
			{
				toVAlue: 8,
				duration: 8000,
				easing: Easing.linear 
			}
		).start(() => this.animate());
	}

    render() {
		
		const xpos1 = this.animatedValue.interpolate({
			inputRange: [0,1,3,5,8],
			outputRange: [1200,600,0,-600,-1200]
		});

		const xpos2 = this.animatedValue.interpolate({
			inputRange: [0,2,4,6,8],
			outputRange: [1200,600,0,-600,-1200]
		});

		const xpos3 = this.animatedValue.interpolate({
			inputRange: [0,3,5,7,8],
			outputRange: [1200,600,0,-600,-1200]
		});
		
        return (
            <ScrollView>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center}}>
					<Animated.View style={{width: '100%', transform: [{translateX: xpos1}]}}>
						<RenderItem
							item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
							isLoading={this.props.dishes.isLoading}
							errMess={this.props.dishes.errMess}

						/>
					</Animated.View>

					<Animated.View style={{width: '100%', transform: [{translateX: xpos2}]}}>
						<RenderItem
							item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
							isLoading={this.props.promotions.isLoading}
							errMess={this.props.promotions.errMess}
						/>
					</Animated.View>

					<Animated.View style={{width: '100%', transform: [{translateX: xpos3}]}}>
						<RenderItem
							item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
							isLoading={this.props.leaders.isLoading}
							errMess={this.props.leaders.errMess}
						/>
					</Animated.View>
				</View>
            </ScrollView>
            );
    }
}

export default connect(mapStateToProps)(Home);
