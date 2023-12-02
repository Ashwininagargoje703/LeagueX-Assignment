import React from "react";
import {
  StatusBar,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
} from "react-native";
import { CubeNavigationHorizontal } from "react-native-3dcube-navigation";

const { width, height } = Dimensions.get("window");

const imagesWithText = [
  {
    uri: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?cs=srgb&dl=pexels-lucie-liz-3165335.jpg&fm=jpg",
    text: "ISSUE N°",
    text1: "0 1",
    text2: "THE CHILDERN OF THE DRAGON",
    text3: "Swipe the card",
  },
  {
    uri: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNl8zZF9pbGx1c3RyYXRpb25fb2ZfYV9kaW1seV9saXRfZ2FtZV9yb29tX25lb25fd19kZDliOGJjOS1lZjU5LTRhYTktYmNhMi1iOWUyNDkyZmI0YzRfMS5qcGc.jpg",
    text: "ISSUE N°",
    text1: "0 2",
    text2: "THE CHILDERN OF THE DRAGON",
    text3: "Swipe the card",
  },
  {
    uri: "https://imageio.forbes.com/specials-images/imageserve/64aceb40d0ea591fa2edfb01/Two-Technology-Trends-Shaping-The-Future-Of-Gaming/960x0.jpg?height=398&width=711&fit=bounds",
    text: "ISSUE N°",
    text1: "0 3",
    text2: "THE CHILDERN OF THE DRAGON",
    text3: "Swipe the card",
  },
  {
    uri: "https://media.kasperskycontenthub.com/wp-content/uploads/sites/43/2021/07/01091502/abstract_digital-gamepad-sl-800x450.jpg",
    text: "ISSUE N°",
    text1: "0 4",
    text2: "THE CHILDERN OF THE DRAGON",
    text3: "Swipe the card",
  },
];

export default class CubeHorizontal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      move: new Animated.Value(600),
    };
  }

  goToNext = () => {
    this.cube.scrollTo(2);
  };

  callBackAfterSwipe = (pos) => {
    if (Math.abs(pos) === width * 3) {
      //this.state.move.setValue(400)
      Animated.timing(this.state.move, {
        toValue: 230,
        duration: 4000,
        delay: 100,
      }).start();
    }
  };

  render() {
    return (
      <View style={styles.father}>
        <StatusBar />
        <CubeNavigationHorizontal
          ref={(view) => {
            this.cube = view;
          }}
          callBackAfterSwipe={this.callBackAfterSwipe}
        >
          {imagesWithText.map((item, index) => (
            <View
              key={index}
              style={[styles.container, { backgroundColor: "#5CDB8B" }]}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: item.uri }}
                  style={[styles.image, { height: height / 2 }]}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <Text
                  style={[
                    styles.text,
                    {
                      paddingBottom: 20,
                      paddingHorizontal: 20,
                      marginLeft: 10,
                      marginTop: 20,
                    },
                  ]}
                >
                  {item.text}
                </Text>

                <Text
                  style={{
                    flexDirection: "row",
                    fontSize: 42,
                    fontWeight: 900,
                    textAlign: "center",
                  }}
                >
                  {item.text1}
                </Text>

                <Text
                  style={{
                    flexDirection: "row",
                    fontSize: 22,
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  {item.text2}
                </Text>

                <Text
                  style={{
                    flexDirection: "row",
                    fontSize: 18,
                    fontWeight: 500,
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  {item.text3}
                </Text>
              </View>
            </View>
          ))}
        </CubeNavigationHorizontal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  father: {
    flex: 1,
    position: "relative",
  },
  container: {
    flexDirection: "column",
  },
  text: {
    color: "#3a405a",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: width,
    resizeMode: "cover",
  },
});
