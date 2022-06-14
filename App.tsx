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
      setTimeout(() => {
        list1Ref.current.scrollToIndex({index:temp});
      }, 0);
    }
    else setdisplayArray([])
  }

  const onChangedRef = useRef((props) => {
    let tempDate;
    tempDate = moment(props?.viewableItems[0]?.item?.day, 'YYYY-MM-DD');
    setDate(tempDate);
    // console.log(tempDate,'fl view items ===>',props);
  })

  function renderEmpty() {
      return (<Center flex={1}>
        <Text color={'gray.400'} fontSize={14} p={6}>
          No orders for the day
        </Text>
      </Center>)
  }


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
            ListEmptyComponent={renderEmpty}
          />
        </Center>
      </Box>
    </NativeBaseProvider>
  )
}