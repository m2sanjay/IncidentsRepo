import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

class Home extends React.Component {
  renderArticles = () => {
    const text1 = ["Batting","Catches"];
    const text2 = ["Bowling"];
    const text3 = ["Colorful"];
    
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Text color={argonTheme.COLORS.WHITE} size={12}> Latest Posts </Text>
          <Card item={articles[0]} aspect={text1} horizontal  />
          <Card item={articles[1]} aspect={text2} horizontal  />
          <Card item={articles[2]} aspect={text1} horizontal  />
          {/* <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block> */}
          <Card item={articles[3]} aspect={text3} horizontal />
          {/* <Card item={articles[4]} full /> */}
        </Block>
      </ScrollView>
    )
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
          <Block flex>
          {this.renderArticles()}
          </Block>
          {/* <CustomTabNavigator navigation={navigation} /> */}
          {/* <TabNavigator navigation={navigation}/> */}
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: "#3C57C4", 
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE
  },
  profileContainer: {
    width: width,
    height: height-250,
    zIndex: 1,
    paddingLeft: 15
  },
  profileBackground: {
    width: width,
    height: height
  },
});

export default Home;
