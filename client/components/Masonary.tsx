import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import NoProducts from './NoProducts';
import ProductImage from './ProductImage';

interface MasonaryProps {
  isLoading: boolean;
  products: IProduct[];
  limit: number;
  total: number;
  page: number;
  isListLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onPressIn: (id:string)=>void;
  onPressOut: ()=>void;
}

const Masonary = ({
  isLoading,
  products,
  limit,
  total,
  page,
  setPage,
  isListLoading,
  onPressIn,
  onPressOut,
}: MasonaryProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      onMomentumScrollEnd={(e) => {
        const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
        // const scrollPosition = e.nativeEvent.contentOffset.y;
        const contentHeight = e.nativeEvent.contentSize.height;
        if (
          scrollViewHeight + contentHeight >= contentHeight - 500 &&
          page <= Math.ceil(total / limit)
        ) {
          setPage((prev) => prev + 1);
        }
      }}
    >
      {isLoading ? (
        <View className="flex-1 items-center justify-center z-0">
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View>
          {products?.length ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View>
                  {products
                    ?.filter((_, idx) => idx % 2 !== 0)
                    ?.map((item, idx) => {
                      return (
                        <ProductImage item={item} key={item._id} index={idx} onPress={()=>onPressIn(item._id)} onPressOut={onPressOut}/>
                      );
                    })}
                </View>
                <View>
                  {products
                    ?.filter((_, idx) => idx % 2 === 0)
                    ?.map((item, idx) => {
                      return (
                        <ProductImage item={item} key={item._id} index={idx} onPress={()=>onPressIn(item._id)} onPressOut={onPressOut}/>
                      );
                    })}
                </View>
              </View>
              {isListLoading && (
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator size={'small'} />
                </View>
              )}
            </>
          ) : (
            <NoProducts />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default Masonary;
