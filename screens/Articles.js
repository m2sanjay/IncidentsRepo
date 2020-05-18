import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
//galio
import { Block, Button, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card, PostCard, Input, Switch } from "../components/";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const categories = [
  {
    title: "Music Album",
    description:
      "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=840&q=80",
    price: "$125"
  },
  {
    title: "Events",
    description:
      "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
    image:
      "https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=840&q=80",
    price: "$35"
  }
];

class Articles extends React.Component {
  state = {
    "switch-1": true,
    "switch-2": false,
    "publicText": "Public"
  };
  toggleSwitch = (switchId, text) => {
    var value = this.state[text] == "Public" ? "Private" : "Public";
    this.setState({ [switchId]: !this.state[switchId], [text]: value });
  }
  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        // onPress={() => navigation.navigate("Pro", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productPrice}
            >
              {item.price}
            </Text>
            <Text center size={34}>
              {item.title}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {item.description}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };
  renderCards = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        {/* <Text bold size={16} style={styles.title}>
          Create Posts
        </Text> */}
        
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            {/* <Card item={articles[0]} full /> */}
            <Block flex card shadow style={{ marginTop: 10 }}>
              <PostCard
                full 
                item={articles[1]}
                style={{ margin: theme.SIZES.BASE }}
              />
              
              {/* <Card item={articles[2]} /> */}
            </Block>
            <Block flex card shadow style={{ marginTop: 10 }}>
              <PostCard
                full 
                item={articles[2]}
                style={{ margin: theme.SIZES.BASE }}
              />
              
              {/* <Card item={articles[2]} /> */}
            </Block>
            {/* <Block flex card shadow style={styles.category}>
              
              <Block flex center>
                <Input right placeholder="Aspect" style={styles.search} iconContent={<Block />} />
              </Block>
            </Block>  */}
            {/* <Card item={articles[4]} full /> */}
            <Block flex card shadow style={styles.category}>
              <ImageBackground
                source={{ uri: Images.Products["View article"] }}
                style={[
                  styles.imageBlock,
                  { width: width - theme.SIZES.BASE * 2, height: 1 }
                ]}
                imageStyle={{
                  width: width - theme.SIZES.BASE * 2,
                  height: 252
                }}
              >
                {/* <Block style={styles.categoryTitle}>
                  <Text size={18} bold color={theme.COLORS.WHITE}>
                    Search
                  </Text>
                </Block> */}
              </ImageBackground>
            </Block>
          </Block>
          {/* <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2
              }}
            >
              {categories &&
                categories.map((item, index) =>
                  this.renderProduct(item, index)
                )}
            </ScrollView>
          </Block> */}
        </Block>
        <Block center>
          
          <Switch
              value={this.state["switch-1"]}
              onValueChange={() => this.toggleSwitch("switch-1", "publicText")}
          />
          <Text bold size={16} style={styles.title}> {this.state["publicText"]} </Text>
        </Block>
        <Block center>
          <Button
            style={styles.button}
            color="primary"
            // onPress={() => navigation.navigate("WelcomeScreen2")}
            onPress={() => navigation.navigate("Home")}
            textStyle={{  color: argonTheme.COLORS.WHITE }}
          >
            <Text bold size={14} color={argonTheme.COLORS.WHITE}> Create Posts </Text>
          </Button>
        </Block>
      </Block>

    );
  };

  renderAlbum = () => {
    const { navigation } = this.props;

    return (
      <Block
        flex
        style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}
      >
        <Text bold size={16} style={styles.title}>
          Album
        </Text>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate("Home")}
            >
              View All
            </Text>
          </Block>
          <Block
            row
            space="between"
            style={{ marginTop: theme.SIZES.BASE, flexWrap: "wrap" }}
          >
            {Images.Viewed.map((img, index) => (
              <Block key={`viewed-${img}`} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.albumThumb}
                />
              </Block>
            ))}
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.renderCards()}
          
        </ScrollView>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    color: argonTheme.COLORS.WHITE
  },
  profileContainer: {
    width: width,
    height: height-210,
    zIndex: 1,
    // paddingLeft: 15
  },
  profileBackground: {
    width: width,
    height: height-50
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  button: {
    width: width * 0.5,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  search: {
    height: 40,
    width: width * 0.3,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Articles;
