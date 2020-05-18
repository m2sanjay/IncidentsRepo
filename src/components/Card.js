import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Checkbox, Text, theme } from 'galio-framework';
const { width, height } = Dimensions.get("screen");
import { argonTheme } from '../constants';
import Icon from "./Icon";


class Card extends React.Component {
  checked(){
    alert("Chcked ");
    if(this.props.fn){
      this.props.fn();
    }
  }
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle, aspect } = this.props;
    
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => this.checked}>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.image}} style={imageStyles} />
            <Block flex style={styles.chkBox}>
                <Block flex row>
                  <Block flex left>
                    <Checkbox checkboxStyle={{ borderWidth: 3 }} color={argonTheme.COLORS.SUCCESS} label=" " />
                  </Block>
                  <Block flex right >
                    <Icon name="ios-link" family="Ionicon" size={16} color={argonTheme.COLORS.ERROR}/>
                  </Block>
                </Block>
              {/* <Checkbox checkboxStyle={{ borderWidth: 3 }} color={argonTheme.COLORS.SUCCESS} label=" " />
              <Icon name="md-people" family="Ionicon" size={14} color={argonTheme.COLORS.ERROR}/> */}
              
              {aspect.map((textAspect, i) => (
                <Block key={i} flex row>
                  <Block flex left>
                    <Text color={argonTheme.COLORS.WHITE} size={12} style={styles.aspect}> {textAspect} </Text>
                  </Block>
                  <Block flex right style={styles.aspect1}>
                    <Checkbox checkboxStyle={{borderWidth: 3}} color={argonTheme.COLORS.SECONDARY} label=" "/>
                  </Block>
                </Block>
              ))}
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.checked}>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.image2}} style={imageStyles} />
            <Block flex style={styles.chkBox}>
                <Block flex row>
                  <Block flex left>
                    <Checkbox checkboxStyle={{ borderWidth: 3 }} color={argonTheme.COLORS.SUCCESS} label=" " />
                  </Block>
                  <Block flex right >
                    <Icon name="ios-link" family="Ionicon" size={16} color={argonTheme.COLORS.ERROR}/>
                  </Block>
                </Block>
              {aspect.map((textAspect, i) => (
                <Block key={i} flex row>
                  <Block flex left>
                    <Text color={argonTheme.COLORS.WHITE} size={12} style={styles.aspect}> {textAspect} </Text>
                  </Block>
                  <Block flex right style={styles.aspect1}>
                    <Checkbox checkboxStyle={{borderWidth: 3}} color={argonTheme.COLORS.SECONDARY} label=" "/>
                  </Block>
                </Block>
              ))}
            </Block>
          </Block>
          {/* <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>{item.title}</Text>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.cta}</Text>
          </Block> */}
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  aspect: {
    marginTop: 10
  },
  aspect1: {
    marginTop: 10
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    backgroundColor: theme.COLORS.FACEBOOK
  },
  chkBox:{
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);