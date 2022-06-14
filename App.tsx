/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import moment from 'moment';
import { Box, Center, FlatList, Flex, NativeBaseProvider, Pressable, Text } from 'native-base';
import { getRandomString } from 'native-base/lib/typescript/theme/tools';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { data } from './MockData';
import CalendarStrip from 'react-native-calendar-strip';
// const data = [
//   {
//     date: moment().add(0,'d'),
//     name: '1',
//   },
//   {
//     date: moment().add(1,'d'),
//     name: '2',
//   },
//   {
//     date: moment().add(2,'d'),
//     name: '3',
//   },
//   {
//     date: moment().add(3,'d'),
//     name: '4',
//   },
//   {
//     date: moment().add(4,'d'),
//     name: '5',
//   },
//   {
//     date: moment().add(5,'d'),
//     name: '6',
//   },
//   {
//     date: moment().add(6,'d'),
//     name: new Date().getDay(),
//   },
// ]
export default function App() {
  const list1Ref = useRef();
  const [selectedDate, setDate] = useState(new Date());
  const [array, setArray] = useState([]);
  const [fileteredArray, setfileteredArray] = useState([]);
  const [displayArray, setdisplayArray] = useState([]);
  const viewabilityConfig = useRef({ minimumViewTime: 5,/*viewAreaCoveragePercentThreshold:'50%',*/itemVisiblePercentThreshold: '50%', waitForInteraction: false })

  useEffect(() => {
    setTimeout(() => { // timeout emuloating delay of api call
      const vals = Object.keys(data).map(key => data[key]).flat();
      setArray(vals);
      setfileteredArray(vals);
      setdisplayArray(vals)
    }, 2000);
  }, [])

  const onPress = (date: any) => {
    let temp = fileteredArray.findIndex(i => {
      return moment(i?.day, 'YYYY-MM-DD').isSame(date, 'day')
    })
    if (temp > -1) {
      setdisplayArray(fileteredArray);
      list1Ref.current.scrollToIndex({index:temp});
    }
    else setdisplayArray([])
  }

  const onChangedRef = useRef((props) => {
    let tempDate;
    tempDate = moment(props?.viewableItems[0]?.item?.day, 'YYYY-MM-DD');
    setDate(tempDate);
    // console.log(tempDate,'fl view items ===>',props);
  })


  return (
    <NativeBaseProvider >
      <Box bg={'#AAA'} flex={1} justifyContent={'center'} safeArea >
        <Flex >
          <CalendarStrip
            scrollable
            style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
            calendarColor={'#FF7607'}
            calendarHeaderStyle={{ color: 'white' }}
            dateNumberStyle={{ color: 'white' }}
            dateNameStyle={{ color: 'white' }}
            iconContainer={{ flex: 0.1 }}
            selectedDate={selectedDate}
            startingDate={moment('10-06-2022', 'dd-mm-yyyy')}
            onDateSelected={onPress}
          />
          {/* <FlatList
          
            horizontal
            data={array}
            renderItem={({ item, index }) => {
              const date = moment(item?.date).format('Do [\n]MMM')
              return (
                <Pressable onPress={()=>onPress(item)} w={100} h={100} alignItems={'center'} justifyContent={'center'} bg={'pink.100'} mr={2}>
                  <Text color={index==selectedIndex ? 'red.400':'black'}>{date}</Text>
                </Pressable>
              )
            }}
            getItemLayout={(data, index) => (
              {length: 108, offset: 108 * index, index}
            )}
          /> */}
        </Flex>
        <Center bg={'#FFF'} flex={1} py={1}>
          <FlatList
            ref={list1Ref}
            data={displayArray}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              const date = moment(item?.day).format('DD-MM-YYYY')
              return (
                <Box h={100} alignItems={'center'} justifyContent={'center'} bg={'pink.100'} mb={2}>
                  <Text textAlign={'center'}>{item?.name}{'\n'}{date}</Text>
                </Box>
              )
            }}
            viewabilityConfig={viewabilityConfig.current}
            onViewableItemsChanged={onChangedRef.current}
            getItemLayout={(data, index) => (
              { length: 102, offset: 102 * index, index }
            )}
          />
        </Center>
      </Box>
    </NativeBaseProvider>
  )
}