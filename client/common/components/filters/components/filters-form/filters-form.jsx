// @flow

import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-navigation';
import {Slider, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Circle} from 'react-native-maps';

import type {categoryType, searchFilterType} from '../../../../types';
import {colors, commonStyles} from '../../../../styles';
import {headerPadding} from '../../../header/styles';
import MapView from '../../../map-view';

type Props = {
  onApplyFilters: searchFilterType => void,
  categories: Array<categoryType>,
  onClose: () => {},
  currentFilters?: searchFilterType,
};

const FiltersForm = ({
  onApplyFilters,
  categories,
  currentFilters,
  onClose,
}: Props) => {
  const [range, setRange] = useState(
    currentFilters && currentFilters.range ? currentFilters.range : 25,
  );
  const [location, setLocation] = useState({
    lat:
      currentFilters && currentFilters.location
        ? currentFilters.location.lat
        : 0,
    lng:
      currentFilters && currentFilters.location
        ? currentFilters.location.lng
        : 0,
  });
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map(({id}) => ({
      id,
      selected:
        currentFilters && currentFilters.categories
          ? currentFilters.categories.find(cid => cid === id) !== undefined
          : true,
    })),
  );

  const [useLocation, setUseLocation] = useState(
    !!currentFilters && currentFilters.location,
  );

  const reset = () => {
    setSelectedCategories(cats => cats.map(cat => ({...cat, selected: true})));
    setRange(25);
    setUseLocation(false);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          commonStyles.widthFull,
          commonStyles.heightFull,
          commonStyles.flexColumn,
        ]}>
        <View
          style={[
            commonStyles.flexRowAlignCenter,
            headerPadding,
            commonStyles.spaceBetween,
          ]}>
          <View style={commonStyles.flexRowJustifyAlignCenter}>
            <Icon name="arrow-back" onPress={onClose} />
            <Text>Select Filters</Text>
          </View>

          <View
            style={[
              commonStyles.flexRowJustifyAlignCenter,
              commonStyles.alignSelfEnd,
            ]}>
            <TouchableOpacity
              onPress={reset}
              style={[commonStyles.marginRight5]}>
              <Icon name="undo" color={colors.danger} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                onApplyFilters({
                  categories: selectedCategories
                    .filter(cat => cat.selected)
                    .map(({id}) => id),
                  location: useLocation ? location : undefined,
                  range: useLocation ? range : undefined,
                })
              }>
              <Icon name="done" color={colors.success} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[commonStyles.widthFull, commonStyles.flex1]}>
          <View
            style={[
              commonStyles.widthFull,
              commonStyles.flexColumn,
              commonStyles.marginLeft10,
              commonStyles.marginRight10,
            ]}>
            <View>
              <ScrollView horizontal>
                {categories.map((cat: categoryType) => (
                  <TouchableOpacity
                    onPress={() =>
                      setSelectedCategories(categories =>
                        categories.map(c =>
                          c.id === cat.id ? {...c, selected: !c.selected} : c,
                        ),
                      )
                    }
                    style={[
                      commonStyles.flexRowJustifyAlignCenter,
                      {height: 40},
                      commonStyles.marginRight10,
                    ]}>
                    <Icon
                      name={
                        selectedCategories.find(sel => sel.id === cat.id)
                          .selected
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
                      type="material-community"
                    />
                    <Text>{cat.value}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={[
                commonStyles.flexRowAlignCenter,
                commonStyles.marginTop10,
              ]}
              onPress={() => setUseLocation(l => !l)}>
              <Icon
                name={
                  useLocation ? 'checkbox-marked' : 'checkbox-blank-outline'
                }
                type="material-community"
              />
              <Text>Inside Region</Text>
            </TouchableOpacity>
          </View>

          {useLocation ? (
            <View
              style={[
                commonStyles.widthFull,
                commonStyles.flex1,
                commonStyles.flexColumn,
                commonStyles.marginTop10,
              ]}>
              <View
                style={[
                  commonStyles.flexRowJustifyAlignCenter,
                  commonStyles.widthFull,
                  commonStyles.marginLeft10,
                  commonStyles.marginRight10,
                ]}>
                <Text>Radius: </Text>
                <Slider
                  minimumValue={1}
                  maximumValue={1000}
                  step={1}
                  value={Math.min(range, 1000)}
                  onValueChange={val => setRange(val)}
                  style={[commonStyles.flex1]}
                />
                <TextInput
                  style={[
                    commonStyles.marginLeft10,
                    {
                      borderBottomColor: '#000',
                      borderBottomWidth: 2,
                      paddingHorizontal: 2,
                      width: 40,
                    },
                  ]}
                  value={range.toString()}
                  onChangeText={val => setRange(+val)}
                  keyboardType="number-pad"
                  textAlign="right"
                />
                <Text
                  style={[
                    commonStyles.marginRight20,
                    commonStyles.marginLeft10,
                  ]}>
                  kms
                </Text>
              </View>
              <MapView onLocationChange={({location}) => setLocation(location)}>
                <Circle
                  center={{latitude: location.lat, longitude: location.lng}}
                  radius={range * 1000}
                  strokeColor="rgba(0, 0, 0, 0.2)"
                  fillColor="rgba(0, 0, 0, 0.2)"
                />
              </MapView>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FiltersForm;
