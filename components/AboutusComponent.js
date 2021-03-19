import React, { Component, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-elements';
//import { LEADERS } from '../shared/leaders';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function RenderHistory() {
    return (
        <Card>
            <Card.Title style={{ color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Our History</Card.Title>
            <Card.Divider />

            <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', paddingTop: 45 }}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
            </View>
        </Card>
    );
}

function RenderLeaders() {

    const [ theLeaders ] = useState(LEADERS);

    return (
        <Card>
            <Card.Title style={{ color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Corporate Leadership</Card.Title>
            <Card.Divider />

            <View>

                <FlatList
                    keyExtractor={(item) => item.id}
                    data={theLeaders}
                    renderItem={({ item }) =>(
                        <View>
                            {/*<Image source={require('./images/alberto.png')} style={{ position: 'absolute', width: 40, height: 40, zIndex: 100, borderRadius: 10, marginTop: 60 }} />*/}
                            <Image source={{ uri: baseUrl + item.image }} style={{ position: 'absolute', width: 40, height: 40, zIndex: 100, borderRadius: 10, marginTop: 60 }} />
                            <Text style={{ color: '#000', fontSize: 18, marginLeft: 50, marginTop: 10 }}>{item.name}</Text>
                            <Text style={{ color: 'grey', fontSize: 14, marginLeft: 50 }}>{item.description}</Text>
                        </View>)
                    }
                />
            </View>
        </Card>
        )
}

class About extends Component {


    render() {
        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <History />
                    <Card title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        } else if (this.props.leaders.errMess) {
            return(
				<ScrollView>
					<Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
						<History />
						<Card title='Corporate Leadership'>
							<Text>{this.props.leaders.errMess}</Text>
						</Card>
					</Animatable.View>
					
				</ScrollView>
			);
        } else {
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
						<History />
						<Card title='Corporate Leadership'>
							<FlatList
								data={this.props.leaders.leaders}
								renderItem={renderLeader}
								keyExtractor={item => item.id.toString()}
							/>
						</Card>
					</Animatable.View>
                </ScrollView>
            );
        }
        return (
            <View>
                <ScrollView>
                    <RenderHistory />
                    <RenderLeaders />
                </ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps)(About);
