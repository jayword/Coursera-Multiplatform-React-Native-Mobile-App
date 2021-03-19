import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';


function RenderDish() {
        return (
            <Card>
                <Card.Title style={{ color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Contact Information</Card.Title>
                <Card.Divider />
                
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 15 }}>121, Clear Water Bay Road</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 15 }}>Clear Water Bay, Kowloon</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 15 }}>HONG KONG</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 15 }}>Tel: +852 1234 5678</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 15 }}>Fax: +852 8765 4321</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 15 }}>Email:confusion@food.net</Text>
                </View>
				
				<Button 
					title='Send Email'
					buttonStyle={{backgroundColor: '#512DA8'}}
					icon={<Icon name='envelope-o' type='font-awesome' color='white'/>}
					onPress={this.sendMail}
				/>
            </Card>
        );
}

export default class Contact extends Component {
    
	sendMail(){
		MailComposer.composeAsync({
			recipient: ['confusion@food.net'],
			subject: 'Enquiry',
			body: 'To whom it may concern:'
		});
	}
	
    render() {
        return (
			<Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
				<RenderDish />
			</Animatable.View>
		
		);
    }
}
