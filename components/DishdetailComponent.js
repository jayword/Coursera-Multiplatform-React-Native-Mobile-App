import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
//import { DISHES } from '../shared/dishes';
//import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
	postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))
});


function RenderDish(props) {
    const dish = props.dish;

	handleViewRef = ref => this.view = ref;

	const recognizeDrag = ({moveX, moveY, dx, dy}) => {
		if(dx < -200){
			return true;
		}else{
			return false;
		}
	}

	const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if (dx > 200)
            return true;
        else
            return false;
    };
	
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: (e, gestureState) => {
			return true;
		},
		onPanResponderGrant: () => {
			this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
		},
		onPanResponderEnd: (e, gestureState) => {
			if(recognizeDrag(gestureState)){
				Alert.alert(
					'Add to Favorites?',
					'Are you sure you wish to add' + dish.name + 'to your favorites?',
					[
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel pressed'),
							style: 'cancel'
						},
						{
							text: 'OK',
							onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
						}
					],
					{cancelable: false}
				)
				
			}else if(recognizeComment(gestureState)){
				props.onComment();
			}
			
			return true;
		}
	});

	const shareDish = (title, message, url) => {
		Share.share({
			title: title,
			message: title + ': ' + message + ' ' + url,
			url: url
		},{
			dialogTitle: 'Share ' + title
		});
	}

    if (dish != null) {
        return (
            <Card>
                {/*<Card.Title>{item.name}</Card.Title>
                <Card.Divider />*/}
                <Card.Title style={{ color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Contact Information</Card.Title>
                {/*<Card.Image source={require('./images/uthappizza.png')}>*/}
                <Card.Image source={{ uri: baseUrl + dish.image }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingTop: 60 }}>{dish.name}</Text>
                </Card.Image>
                <View>
                    <Text style={{ margin: 10 }}>{dish.description}</Text>
                </View>

                <Icon
                    raised
                    reverse
                    name={props.favorite ? "heart" : "heart-o"}
                    type="font-awesome"
                    color="#f50"
                    onPress={() => props.favorite ? console.log("Already favorite") : props.onPress()}
                />
				<Icon
					raised
					reverse
					name='pencil'
					type='font-awesome'
					color='#512DA8'
					onPress={() => props.onComment()}
				/>
				<Icon 
					raised
					reverse
					name='share'
					type='font-awesome'
					color='#51D2A8'
					style={styles.cardItem}
					onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
				/>
            </Card>
            );
    } else {
        return (<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return (
		<Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef} {...panResponder.panHandlers}>
			<Card>
				<Card.Title>Comments</Card.Title>
				<Card.Divider />
				<FlatList
					data={comments}
					renderItem={renderCommentItem}
					keyExtractor={item => item.id.toString()}
				/>
			</Card>
		</Animatable.View>
    );
}

class Dishdetail extends Component {
    
	constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }

    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

	toggleModal() {
		this.setState({ showModal: !this.state.showModal })
	}

    handleComments(dishId) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);
    }

    resetForm() {
        this.setState({
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        });
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
				<Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef} {...panResponder.panHandlers}>
					<RenderDish
						dish={this.props.dishes.dishes[+dishId]}
						favorite={this.props.favorites.some(el => el === dishId)}
						onPress={() => this.markFavorite(dishId)}
						onComment={() => this.toggleModal()}
					/>
					
					<RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
				
					<Modal animation={"slide"} transparent={false}
						visible={this.state.showModal}
						onDismiss={() => { this.resetForm(); }}
						onRequestClose={() => { this.resetForm(); }}
					>
						<View style={styles.modal}>
							<View>
								<Rating showRating
									type="star"
									fractions={0}
									startingValue={0}
									imageSize={30}
									onFinishRating={(rating) => this.setState({ rating: rating })}
								/>
							</View>
							<View>
								<Input
									placeholder='Author'
									leftIcon={
										<Icon
											name='user-o'
											type='font-awesome'
											size={24}
										/>
									}
									onChangeText={(value) => this.setState({ author: value })}
								/>
							</View>
							<View>
								<Input
									placeholder="Comment"
									leftIcon={
										<Icon
											name='comment-o'
											type='font-awesome'
											size={24}
										/>
									}
									onChangeText={(value) => this.setState({ comment: value })}
								/>
							</View>
							<View>
								<Button color="#512DA8"
									title="SUBMIT"
									onPress={() => this.handleComments(dishId)}
								/>
							</View>
							<View>
								<Button
									onPress={() => { this.resetForm(); }}
									color="#989898"
									title="CANCEL"
								/>
							</View>
						</View>
					</Modal>
				</Animatable.View>
			</ScrollView>
        ); 
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 28
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'coral',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
