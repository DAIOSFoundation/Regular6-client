import React, {Component} from 'react';
import {
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [false, false, false, false, false, false],
        }
    }
    toggleMeeting(index) {
        let array = [];
        for (let i = 0; i < index; i++) {
            array[i] = false;
        }
        array[index]=!this.state.locations[index];
        for (let j = index+1; j < this.state.locations.length; j++) {
            array[j]=false;
        }
        this.setState({
            locations: array
        });

    }

    _onPress() {
        this.props._onPress(!this.state.status)
        this.setState({status: !this.state.status})
        switch (this.props.effect) {
            case 'bounce':
                this.refs.view.bounce(800)
                break;
            case 'flash':
                this.refs.view.flash(800)
                break;
            case 'jello':
                this.refs.view.jello(800)
                break;
            case 'pulse':
                this.refs.view.pulse(800)
                break;
            case 'rotate':
                this.refs.view.rotate(800)
                break;
            case 'rubberBand':
                this.refs.view.rubberBand(800)
                break;
            case 'shake':
                this.refs.view.shake(800)
                break;
            case 'swing':
                this.refs.view.swing(800)
                break;
            case 'tada':
                this.refs.view.tada(800)
                break;
            case 'wobble':
                this.refs.view.wobble(800)
                break;
        }

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this._onPress()}>
                <Animatable.View ref="view" style={{
                    backgroundColor: this.state.status ? this.props.onColor : "white",
                    borderRadius: 20,
                    borderWidth:1,
                    paddingVertical:10,
                    justifyContent:'center',
                    alignItems: 'center',
                    marginHorizontal:5,
                }}>
                    <Text style={{
                        color: this.state.status ? "white" : "#696969",
                        fontWeight: "bold"
                    }}>{this.props.text}</Text>
                </Animatable.View>
            </TouchableWithoutFeedback>
        );
    }
}

export default Buttons;
