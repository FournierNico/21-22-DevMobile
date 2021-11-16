import React from 'react';
import { View, StyleSheet } from 'react-native';

const Test2 = () => {
  return (
    <View style={styles.mainView}>

      <View style={styles.topView}>
        <View style={styles.topSecondaryFirstView}>
          <View style={styles.topBoxViews} />
          <View style={styles.topBoxViews} />
        </View>
        <View style={styles.topSecondarySecView}>
          <View style={styles.topBoxViews} />
        </View>
        <View style={styles.topSecondaryThirdView}>
          <View style={{ flex: 4 }} />
          <View style={{ flex: 1, backgroundColor: 'gold' }} />
        </View>
      </View>

      <View style={styles.bottomView}>
        <View style={styles.bottomSecondaryViews} />
        <View style={styles.bottomSecondaryViews}>
          <View style={styles.bottomThirdViews} />
          <View style={[styles.bottomThirdViews,
          { backgroundColor: 'gold' }]} />
          <View style={styles.bottomThirdViews} />
        </View>
        <View style={styles.bottomSecondaryViews} />
      </View>

    </View>
  );
}

export default Test2;

const styles = StyleSheet.create({
  mainView: { flex: 1 },
  topView: {
    flex: 2,
    flexDirection: 'row'
  },
  topSecondaryFirstView: {
    flex: 2,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topSecondarySecView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topSecondaryThirdView: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'flex-end'
  },
  topBoxViews: {
    height: 50,
    width: 50,
    backgroundColor: 'gold'
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row'
  },
  bottomSecondaryViews: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
  bottomThirdViews: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
});