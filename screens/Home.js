import React, {useState, useEffect} from 'react';
import {Appbar, TextInput, Button, Card, Title} from 'react-native-paper';
import {Text, View, FlatList, Image} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

export default Home = (props) => {
  const [info, setInfo] = useState({
    name: 'loading',
    temp: 'loading',
    humidity: 'loading',
    desc: 'loading',
    icon: 'loading',
  });

  //one time call

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    let myCity = await AsyncStorage.getItem('newcity');
    if (!myCity || myCity === ""|| myCity === " ") {
      const city = props.route.params.city;
      myCity = city;
    }



    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=42309fd25b13eeb4541ec64682c16571`,
    )
      .then((item) => item.json())
      .then((data) => {
        //   console.log(data);
        setInfo({
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (props.route.params.city != 'Bengaluru') {
    getWeather();
  }

  return (
    <View style={{flex: 1}}>
      <Header name="Weather App" />
      <View style={{alignItems: 'center'}}>
        <Title style={{color: '#00aaff', marginTop: 30, fontSize: 30}}>
          {info.name}
        </Title>

        <Image
          style={{
            width: 120,
            height: 120,
          }}
          source={{
            uri: 'https://openweathermap.org/img/w/' + info.icon + '.png',
          }}
        />
      </View>

      <Card
        style={{
          margin: 5,
          padding: 12,
        }}>
        <Title style={{color: '#00aaff'}}>Temperature - {info.temp}</Title>
      </Card>

      <Card
        style={{
          margin: 5,
          padding: 12,
        }}>
        <Title style={{color: '#00aaff'}}>Humidity - {info.humidity}</Title>
      </Card>

      <Card
        style={{
          margin: 5,
          padding: 12,
        }}>
        <Title style={{color: '#00aaff'}}>Description - {info.desc}</Title>
      </Card>
    </View>
  );
};
