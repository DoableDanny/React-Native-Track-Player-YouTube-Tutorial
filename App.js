import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const App = () => {
  const tracks = [
    {
      id: 1,
      url: require('./tracks/blues.wav'),
      title: 'Blues Beat',
    },
    {
      id: 2,
      url: require('./tracks/country.mp3'),
      title: 'Blues Beat',
    },
  ];

  TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
    ],
  });

  useEffect(() => {
    setUpTrackPlayer();

    return () => TrackPlayer.destroy();
  }, []);

  const setUpTrackPlayer = () => {
    TrackPlayer.setupPlayer()
      .then(() => {
        TrackPlayer.add(tracks).then(function () {
          console.log('Tracks added');
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          console.log(TrackPlayer.STATE_READY);
          TrackPlayer.play();
        }}>
        <Text style={styles.text}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => TrackPlayer.pause()}>
        <Text style={styles.text}>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => TrackPlayer.skipToNext()}>
        <Text style={styles.text}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: '#ff0044',
    padding: 15,
    borderRadius: 15,
    margin: 10,
    width: 200,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
