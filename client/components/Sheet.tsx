import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { PropsWithChildren, useCallback, useMemo } from 'react';

interface BottomSheetInterface extends PropsWithChildren, Partial<BottomSheet> {
  snapPoints?: Array<number | string>;
  handleSheetChanges?: (index: number) => void;
  index?: number;
}

const Sheet = React.forwardRef<BottomSheet, BottomSheetInterface>(
  (
    {
      index = -1,
      snapPoints = ['25%', '80%'],
      children,
      handleSheetChanges,
      ...rest
    },
    ref
  ) => {
    const snapPointsFun = useMemo(() => snapPoints, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    // renders
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPointsFun}
        index={index}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        {...rest}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    );
  }
);

export default Sheet;
