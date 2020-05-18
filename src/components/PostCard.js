import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Checkbox, Text, theme } from 'galio-framework';
const { width, height } = Dimensions.get("screen");
import { argonTheme } from '../constants';
import Input from './Input';
import Icon from './Icon';
import Button from './Button';

class PostCard extends React.Component {
  checked(){
    if(this.props.fn){
      this.props.fn();
    }
  }
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
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
            <Image source={{uri: item.image2}} style={imageStyles} />
            <Block row space="evenly">
              <Block flex left>
                <Input
                  right
                  color="black"
                  style={styles.search}
                  placeholder="Search"
                  placeholderTextColor={'#8898AA'}
                  iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
                />
              </Block>
              <Block flex right>
                <Input right placeholder="Aspect" style={styles.search} iconContent={<Block />} />
              </Block>
              {/* <Block flex right>
                <Button small center color="default" style={styles.optionsButton}> Add </Button>
              </Block> */}
              
              
            </Block>
            <Block flex center>
              <Button small center color="default" style={styles.optionsButton}> Add </Button>
            </Block>

            {/* <Block flex style={styles.chkBox}>
              <Input
                right
                color="black"
                style={styles.search}
                placeholder="Search Placeholder"
                placeholderTextColor={'#8898AA'}
                iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
              />
            </Block> */}
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

PostCard.propTypes = {
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
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: argonTheme.COLORS.PRIMARY
  },
  search: {
    height: 40,
    width: width * 0.3,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
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
    margin: 10
  },
  chkBox:{
    marginBottom: 16,
    marginTop: 16,
    marginLeft: 10
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

export default withNavigation(PostCard);