import React from 'react';
import { StyleSheet, Image, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, Button, Select, Icon, UserItem } from '../components';
import articles from '../constants/articles';
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");
import { LinearGradient as Gradient } from 'expo';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';
const cards = [
    {
      title: 'John Doe',
      subtitle: '15 Posts',
      icon: 'list-bullet',
      iconFamily: 'Galio',
      pic: "https://wallpapercave.com/wp/wp3990002.jpg"
    },
  
    {
      title: 'John Doe',
      subtitle: '22 Posts',
      icon: 'bag-17',
      iconFamily: 'Galio',
      pic: "https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=1947&q=80"
    },
    {
      title: 'John Doe',
      subtitle: '2 Posts',
      icon: 'credit-card',
      iconFamily: 'Galio',
      pic: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80"
    },
    {
      title: 'John Doe',
      subtitle: '50 Posts',
      icon: 'settings-gear-65',
      iconFamily: 'Galio',
      pic: "https://wallpapercave.com/wp/wp4127835.jpg"
    },
    {
        title: 'John Doe',
        subtitle: '53 Posts',
        icon: 'settings-gear-65',
        iconFamily: 'Galio',
        pic: "https://wallpapercave.com/wp/wp4127835.jpg"
    },
    {
        title: 'John Doe',
        subtitle: '55 Posts',
        icon: 'settings-gear-65',
        iconFamily: 'Galio',
        pic: "https://wallpapercave.com/wp/wp3990002.jpg"
    },
    {
        title: 'John Doe',
        subtitle: '30 Posts',
        icon: 'settings-gear-65',
        iconFamily: 'Galio',
        pic: "https://wallpapercave.com/wp/wp3990002.jpg"
    },{
        title: 'John Doe',
        subtitle: '30 Posts',
        icon: 'settings-gear-65',
        iconFamily: 'Galio',
        pic: "https://wallpapercave.com/wp/wp3990002.jpg"
    },{
        title: 'John Doe',
        subtitle: '230 Posts',
        icon: 'settings-gear-65',
        iconFamily: 'Galio',
        pic: "https://wallpapercave.com/wp/wp3990002.jpg"
    },{
        title: 'John Doe',
        subtitle: '34 Posts',
        icon: 'settings-gear-65',
        iconFamily: 'Galio',
        pic: "https://wallpapercave.com/wp/wp3990002.jpg"
    },{
        title: 'John Doe',
        subtitle: '32 Posts',
        icon: 'settings-gear-65',
        iconFamily: 'Galio',
        pic: "https://wallpapercave.com/wp/wp3990002.jpg"
    },
  ];

class Friends extends React.Component {



    renderCard = (props, index) => {
        const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;
    
        return (
            <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
          <Block row center card shadow space="between" style={styles.card} key={props.title}>
            <Gradient
              start={[0.45, 0.45]}
              end={[0.90, 0.90]}
              colors={gradientColors}
              style={[styles.gradient, styles.left]}
            >
              <Icon
                size={BASE_SIZE}
                name={props.icon}
                color={COLOR_WHITE}
                family={props.iconFamily}
              />
            </Gradient>
    
            <Block flex>
              <Text size={BASE_SIZE * 1.125}>{props.title}</Text>
              <Text size={BASE_SIZE * 0.875} muted>{props.subtitle}</Text>
            </Block>
            <Button style={styles.right}>
              <Icon size={BASE_SIZE} name="minimal-right" family="Galio" color={COLOR_GREY} />
            </Button>
          </Block>
          </ScrollView>
        );
      }
  renderArticles = (props, index) => {
    const gradientColors = GRADIENT_BLUE
    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
            <Block flex style={styles.articles}>  
                {cards.map((user, i) => (
                    <UserItem user={user} key={i}/>
                // <Block row enter card shadow space="evenly" style={styles.card} key={i}>
                //     <Block left style={styles.avatarContainer}>
                //         <Image source={{ uri: Images.ProfilePicture }} style={styles.avatar}/>
                //     </Block>
                //     <Block flex center style={styles.name}>
                //         <Text size={16} style={styles.title}>{user.title}</Text>
                //         <Text size={14} style={styles.title}>{user.subtitle}</Text>
                //     </Block>
                //     <Block flex right>
                //         <Button style={styles.right}>
                //             <Icon size={BASE_SIZE} name="ios-arrow-forward" family="Ionicon" color={argonTheme.COLORS.SECONDARY} />
                //         </Button>
                //     </Block>
                // </Block>
                ))}
            </Block>
        </ScrollView>
    )
  }
  renderCards = () => cards.map((card, index) => this.renderArticles(card, index))
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
          {/* {this.renderCards()} */}
          </Block>
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
    width: width,
    paddingVertical: theme.SIZES.BASE,
    borderWidth: 0,
  },
  profileContainer: {
    width: width,
    height: height-250,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height
  },


  name:{
      alignItems: 'flex-start',
      marginLeft: 10,
      width: width - theme.SIZES.BASE * 1.5
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 1.5
  },
  
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  avatarContainer: {
    position: "relative",
    marginTop: 5
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 70,
    borderWidth: 0
  },
  title: {
    color: argonTheme.COLORS.SECONDARY
  },
  block: {
    backgroundColor: argonTheme.COLORS.SUCCESS
  },
  card: {
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE * 2,
    
    padding: 5,
    backgroundColor: argonTheme.COLORS.PRIMARY,
    shadowOpacity: 0.40,
    marginBottom: 5,
    marginTop: 5
  },
  menu: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  settings: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  left: {
    marginRight: BASE_SIZE,
  },
  right: {
    width: BASE_SIZE * 2,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  gradient: {
    width: BASE_SIZE * 3.25,
    height: BASE_SIZE * 3.25,
    borderRadius: BASE_SIZE * 3.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Friends;
