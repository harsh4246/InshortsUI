import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const PAGES = [
  { id: "1", uri: require('./assets/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.webp')},
  { id: "2", uri: require('./assets/dog-647528__340.webp')},
  { id: "3", uri: require('./assets/gettyimages-507910624-612x612.jpg')},
  { id: "4", uri: require('./assets/snack-icon.png')},
]

export default class App extends React.Component {

  constructor( ) {
    super( )

    this.position = new Animated.ValueXY()
    this.swipedCardPosition = new Animated.ValueXY({x:-SCREEN_WIDTH,y:0})
    this.state = {
      currentIndex: 0
    }
  }

UNSAFE_componentWillMount() {

    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (e,  gesture) => true,
      onPanResponderMove: (evt,  gesture) => {

        if ( gesture.dx > 0 && (this.state.currentIndex > 0)) {
          this.swipedCardPosition.setValue({
            x: -SCREEN_WIDTH +  gesture.dx, y: 0
          })
        }
        else {

        this.position.setValue({ y: null, x: gesture.dx })

        }
      },
      onPanResponderRelease: (evt,  gesture) => {

        if(this.state.currentIndex>0 &&  gesture.dx >50 &&
         gesture.vx>0.2)
        {
          Animated.timing(this.swipedCardPosition,{
            toValue:({x:0, y:0}),
            duration:200
          }).start(() => {

            this.setState({ currentIndex: this.state.currentIndex - 1 })
            this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

          })
        }
        else if (- gesture.dx > 50 && - gesture.vx > 0.2) {

          Animated.timing(this.position, {
            toValue: ({ x: -SCREEN_WIDTH, y: 0 }),
            duration: 400
          }).start(() => {

            this.setState({ currentIndex: this.state.currentIndex + 1 })
            this.position.setValue({ x: 0, y: 0 })

          })
        }
        else {
          Animated.parallel([
            Animated.spring(this.position, {
              toValue: ({ x: 0, y: 0 })
            }),
            Animated.spring(this.swipedCardPosition, {
              toValue: ({ x: -SCREEN_WIDTH, y: 0 })
            })
            
          ]).start()

        }
      }
    })
  }

  renderPAGES = () => {
    return PAGES.map((item, i) => {

      if (i == this.state.currentIndex -1 ) {

        return (
        <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
          {...this.PanResponder.panHandlers}
        >
          <View style={{
            flex: 1,
            position: 'absolute',
            height: SCREEN_HEIGHT, width: SCREEN_WIDTH,
            backgroundColor: 'white'}}>
            <View opacity= {0.1} style={{ flex: 2, backgroundColor: 'black' }}>
              <Image source={PAGES[i].uri}
                style={{flex: 1, height: null, width: null,
                resizeMode: 'center' }}>
              </Image>
            </View>
            <View style={{ flex: 3, padding: 5}}>
              <Text>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mollis, lorem ut laoreet pellentesque, ligula mauris porttitor nibh, vitae convallis magna ipsum id urna. Curabitur commodo odio sapien, eget tincidunt nunc tempus et. Donec vulputate molestie lacus, in ultrices nunc posuere vitae. Quisque ut nulla tincidunt, aliquam quam at, faucibus enim. Aenean nunc arcu, porttitor at sagittis vitae, egestas at elit. Phasellus in tellus porta, facilisis elit in, ornare quam. Proin in turpis id diam volutpat volutpat. Aenean hendrerit purus quis diam lobortis eleifend. Morbi porttitor molestie augue, in fermentum libero ultricies ac. Ut auctor nisl diam, in cursus arcu.
              </Text>
            </View>
          </View>
        </Animated.View>
        )
      }
      else if (i < this.state.currentIndex) {
        return null
      }
      if (i == this.state.currentIndex) {

      return (
        <Animated.View key={item.id} style={this.position.getLayout()}
          {...this.PanResponder.panHandlers}
        >
        <View style={{
          flex: 1,
          position: 'absolute',
          height: SCREEN_HEIGHT, width: SCREEN_WIDTH,
          backgroundColor: 'white'}}>
          <View style={{ flex: 2, backgroundColor: 'black'}}>
            <Image source={PAGES[i].uri}
              style={{flex: 1, height: null, width: null,
              resizeMode: 'center'}}>
            </Image>
          </View>
          <View style={{ flex: 3, padding: 20}}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mollis, lorem ut laoreet pellentesque, ligula mauris porttitor nibh, vitae convallis magna ipsum id urna. Curabitur commodo odio sapien, eget tincidunt nunc tempus et. Donec vulputate molestie lacus, in ultrices nunc posuere vitae. Quisque ut nulla tincidunt, aliquam quam at, faucibus enim. Aenean nunc arcu, porttitor at sagittis vitae, egestas at elit. Phasellus in tellus porta, facilisis elit in, ornare quam. Proin in turpis id diam volutpat volutpat. Aenean hendrerit purus quis diam lobortis eleifend. Morbi porttitor molestie augue, in fermentum libero ultricies ac. Ut auctor nisl diam, in cursus arcu.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mollis, lorem ut laoreet pellentesque, ligula mauris porttitor nibh, vitae convallis magna ipsum id urna. Curabitur commodo odio sapien, eget tincidunt nunc tempus et. Donec vulputate molestie lacus, in ultrices nunc posuere vitae. Quisque ut nulla tincidunt, aliquam quam
            </Text>
          </View>
        </View>
        </Animated.View>
      )
    }
    else{

      return(
        <Animated.View key={item.id}

        >
        <View style={{
          flex: 1,
          position: 'absolute',
          height: SCREEN_HEIGHT, width: SCREEN_WIDTH,
          backgroundColor: 'white'}}>
          <View style={{ flex: 2, backgroundColor: 'black'}}>
            <Image source={PAGES[i].uri}
              style={{flex: 1, height: null, width: null,
              resizeMode: 'center'}}>
            </Image>
          </View>
          <View style={{ flex: 3, padding: 5}}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mollis, lorem ut laoreet pellentesque, ligula mauris porttitor nibh, vitae convallis magna ipsum id urna. Curabitur commodo odio sapien, eget tincidunt nunc tempus et. Donec vulputate molestie lacus, in ultrices nunc posuere vitae. Quisque ut nulla tincidunt, aliquam quam at, faucibus enim. Aenean nunc arcu, porttitor at sagittis vitae, egestas at elit. Phasellus in tellus porta, facilisis elit in, ornare quam. Proin in turpis id diam volutpat volutpat. Aenean hendrerit purus quis diam lobortis eleifend. Morbi porttitor molestie augue, in fermentum libero ultricies ac. Ut auctor nisl diam, in cursus arcu.
            </Text>
          </View>
        </View>
        </Animated.View>
      )
    }
    }).reverse()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderPAGES()}
      </View>
    );
  }
}



