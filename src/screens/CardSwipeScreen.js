import React, { useState, useRef, useEffect } from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  Image,
} from "react-native";
import SearchBar from "./Serachbar";

const imagesWithText = [
  {
    uri: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?cs=srgb&dl=pexels-lucie-liz-3165335.jpg&fm=jpg",
    text: "Text for Image 1, Certainly! To display different text for each image, you can modify the ",
  },
  {
    uri: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNl8zZF9pbGx1c3RyYXRpb25fb2ZfYV9kaW1seV9saXRfZ2FtZV9yb29tX25lb25fd19kZDliOGJjOS1lZjU5LTRhYTktYmNhMi1iOWUyNDkyZmI0YzRfMS5qcGc.jpg",
    text: "Text for Image 2, Certainly! To display different text for each image, you can modify the ",
  },
  {
    uri: "https://imageio.forbes.com/specials-images/imageserve/64aceb40d0ea591fa2edfb01/Two-Technology-Trends-Shaping-The-Future-Of-Gaming/960x0.jpg?height=398&width=711&fit=bounds",
    text: "Text for Image 3, Certainly! To display different text for each image, you can modify the ",
  },
  {
    uri: "https://media.kasperskycontenthub.com/wp-content/uploads/sites/43/2021/07/01091502/abstract_digital-gamepad-sl-800x450.jpg",
    text: "Text for Image 4, Certainly! To display different text for each image, you can modify the ",
  },
];

const CardSwipeScreen = ({ navigation }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const { width } = Dimensions.get("window");
  const SWIPE_THRESHOLD = 10;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          handleSwipe(width);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          handleSwipe(-width);
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const navigateToRotationSlider = () => {
    navigation.navigate("RotationSlider"); // Replace "RotationSlider" with your screen name
  };

  const handleSwipe = (toValue) => {
    Animated.timing(position, {
      toValue: { x: toValue, y: 0 },
      duration: 200, // Adjust animation speed if needed
      useNativeDriver: true,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      setCardIndex((prevIndex) =>
        prevIndex === imagesWithText.length - 1 ? 0 : prevIndex + 1
      );
    });
  };

  const rotateCard = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const animatedCardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate: rotateCard },
    ],
  };

  useEffect(() => {
    const resetIndex = () => {
      setCardIndex(0);
    };

    if (cardIndex === imagesWithText.length) {
      resetIndex();
    }
  }, [cardIndex]);

  const activeCardIndex = cardIndex % imagesWithText.length;
  const activeCards = imagesWithText.slice(
    activeCardIndex,
    activeCardIndex + 4
  );

  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/CmMQM00/bg-image.jpg" }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <SearchBar />
        </View>

        <View style={styles.cardContainer} {...panResponder.panHandlers}>
          {activeCards.map((item, index) => {
            const isMiddleCard = index === 0;
            const isLeftCard = index === 1;
            const isRightCard = index === 2;
            const isBackCard = index === 3; // Adjusted index for back card

            let cardStyle = [styles.card];
            if (isMiddleCard) {
              cardStyle.push(animatedCardStyle);
            } else if (isLeftCard || isRightCard || isBackCard) {
              // Consider the back card for style adjustment
              cardStyle.push(styles.sideCard);
            }

            // Adjust marginLeft to show cards overlapping for the book-like effect
            const marginLeft = isLeftCard
              ? -170
              : isRightCard
              ? 70
              : isBackCard
              ? 0
              : 0;

            return (
              <Animated.View
                key={index}
                style={[
                  cardStyle,
                  { zIndex: isMiddleCard ? 1 : 0, marginLeft },
                ]}
              >
                <Image source={{ uri: item.uri }} style={styles.image} />
              </Animated.View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.rotateButton}
          onPress={navigateToRotationSlider}
        >
          <Text style={styles.buttonText}> Click here for Show Swiper</Text>
        </TouchableOpacity>

        <View style={styles.thumbnailContainer}>
          {imagesWithText.map((item, index) => (
            <View
              key={index}
              style={[
                styles.thumbnail,
                index === cardIndex && styles.activeThumbnail,
              ]}
            >
              <Image source={{ uri: item.uri }} style={styles.thumbnailImage} />
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    width: Dimensions.get("window").width - 110,
    height: Dimensions.get("window").height * 0.4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backCard: {
    transform: [{ scale: 0.9 }],
    opacity: 0.8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeThumbnail: {
    borderColor: "blue", // Highlight the active thumbnail
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
});

export default CardSwipeScreen;
