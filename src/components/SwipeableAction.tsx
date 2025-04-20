import { ReactNode } from "react";
import { Swipeable } from "react-native-gesture-handler";

type Props = {
  children: React.ReactNode;
  leftAction: ReactNode;
  handleSwipe: () => void;
};
export function SwipeableAction({ children, handleSwipe, leftAction }: Props) {
  return (
    <Swipeable
      rightThreshold={80}
      overshootRight={false}
      onSwipeableOpen={handleSwipe}
      renderLeftActions={() => leftAction}
    >
      {children}
    </Swipeable>
  );
}
