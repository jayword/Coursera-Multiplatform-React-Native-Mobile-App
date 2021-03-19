import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Home from './HomeComponent'
import Dishdetail from './DishdetailComponent';
import About from './AboutusComponent';
import Contact from './ContactusComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text, NetInfo, ToastAndroid } from 'react-native';
import { createStackNavigator, createDrawer } from 'react-navigation-stack';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import LoginTab from './LoginComponent';

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes),
    fetchComments: () => dispatch(fetchComments),
    fetchPromos: () => dispatch(fetchPromos),
    fetchLeaders: () => dispatch(fetchLeaders),
});



const MenuCreator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={34} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        })
    },
    Dishdetail: { screen: Dishdetail }
}, {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    });

const HomeCreator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={34} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        })
    }
}, {   
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    });

const AboutCreator = createStackNavigator({
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={34} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        }) }
}, {
        initialRouteName: 'About',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }   
    });

const ContactCreator = createStackNavigator({
    Contact: {
        screen: Contact,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={34} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        }) }
}, {
        initialRouteName: 'Contact',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    });

const FavoritesCreator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={34} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        })
    }
}, {
        initialRouteName: 'Contact',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    });
	
const ReservationCreator = createStackNavigator({
    Reservation: {
        screen: Reservation,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={34} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        })
    }
}, {
        initialRouteName: 'Contact',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    });

const LoginCreator = createStackNavigator({
    LoginTab: {
        screen: LoginTab,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={34} color='black' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        })
    }
}, {
        initialRouteName: 'Contact',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    });

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage}
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);


const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginCreator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (<Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                color={tintColor}
            />)
        }
    },
	Home: {
        screen: HomeCreator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (<Icon
                name='home'
                type='font-awesome'
                size={24}
                color={tintColor}
            />)
        }
    },
    About: {
        screen: AboutCreator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (<Icon
                name='info-circle'
                type='font-awesome'
                size={24}
                color={tintColor}
            />)
        }
    },
    Menu: {
        screen: MenuCreator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (<Icon
                name='list'
                type='font-awesome'
                size={24}
                color={tintColor}
            />)
        }
    },
    Contact: {
        screen: ContactCreator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (<Icon
                name='address-card'
                type='font-awesome'
                size={22}
                color={tintColor}
            />)
        }
    },
    Favorites: {
        screen: FavoritesCreator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (<Icon
                name='heart'
                type='font-awesome'
                size={24}
                color={tintColor}
            />)
        }
    },
    Reservation: {
        screen: ReservationCreator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (<Icon
                name='cutlery'
                type='font-awesome'
                size={24}
                color={tintColor}
            />)
        }
    }
}, {
        initialRouteName: 'Home',
		drawerBackgroundColor: '#D1C4E9',
        contentComponent: CustomDrawerContentComponent
    });

createAppContainer(MainNavigator);

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
		
		NetInfo.getConnectionInfo()
			.then((connectionInfo) => {
			ToastAndroid.show('Initial Network Connectivity Type: '
			+ connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
			ToastAndroid.LONG)
			});

		NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }
	
	componentWillUnmount(){
		NetInfo.removeEvenListener('connectionChange', this.handleConnectivityChange);
	}

	handleConnectivityChange = (connectionInfo) => {
		switch(connectionInfo.type){
			case 'none':
				ToastAndroid.show('You are now offline!', ToastAndroid.LONG)
				break;

			case 'wifi':
				ToastAndroid.show('You are now connected to Wifi!', ToastAndroid.LONG)
				break;

			case 'cellular':
				ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG)
				break;

			case 'unknown':
				ToastAndroid.show('You are now have an Unknown Connection!', ToastAndroid.LONG)
				break;

			default:
				break;
		}
	}

    render() {

        return (

            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <Navigator />
                {/*<Menu dishes={this.state.dishes}
                    onPress={(dishId) => { this.onDishSelect(dishId) }}
                />
                <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
            </View>
            );
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
