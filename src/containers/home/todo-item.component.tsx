import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  Layout,
  SlideInRight,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { Button, Text } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useTheme } from '@/hooks';
import { Todo } from '@/store/todo';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface TodoProps {
  todo: Todo;
  onPressComplete: () => void;
  onPressDelete: (id: string) => void;
}
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
const ITEM_HEIGHT = 60;

const TodoItem = ({ todo, onPressComplete, onPressDelete }: TodoProps) => {
  const theme = useTheme();
  const s = styles(theme);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const marginVertical = useSharedValue(theme.MetricsSizes.small / 2);
  const itemHeight = useSharedValue(ITEM_HEIGHT);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: e => {
      if (e.translationX > 0) {
        return;
      }
      translateX.value = e.translationX;
    },
    onEnd: () => {
      const isDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (isDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);

        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished) {
            runOnJS(onPressDelete)(todo.id);
          }
        });
        return;
      }

      translateX.value = withTiming(0);
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rRightSectionStyle = useAnimatedStyle(() => {
    const opacitySection = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return { opacity: opacitySection };
  });

  const rTodoContainerStyle = useAnimatedStyle(() => {
    return {
      marginVertical: marginVertical.value,
      height: itemHeight.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[s.container, rTodoContainerStyle]}
      entering={SlideInRight.delay(100)}
      layout={Layout.springify()}>
      <PanGestureHandler onGestureEvent={panGesture} activeOffsetX={-1}>
        <Animated.View style={[s.shadow, rStyle]}>
          <TouchableOpacity
            key={todo.id}
            style={s.touch}
            onPress={onPressComplete}
            activeOpacity={1}>
            <View style={s.titleContainer}>
              <BouncyCheckbox
                disableBuiltInState
                size={25}
                bounceEffect={0}
                isChecked={todo.completed}
                fillColor={theme.Colors.primary}
                innerIconStyle={s.checkbox}
                onPress={onPressComplete}
              />
              <Text
                numberOfLines={1}
                status={todo.completed ? 'disabled' : 'basic'}
                style={[s.titleText, todo.completed && s.lineThrough]}>
                {todo.title}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[s.rightSection, rRightSectionStyle]}>
        <Button status="error" size="small">
          Delete
        </Button>
      </Animated.View>
    </Animated.View>
  );
};

const styles = (theme: ThemeVariables) =>
  StyleSheet.create({
    container: {
      marginHorizontal: theme.MetricsSizes.regular,
      justifyContent: 'center',
    },
    shadow: {
      shadowOpacity: 0.08,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowRadius: 3,
      elevation: 3,
    },
    touch: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.MetricsSizes.regular,
      backgroundColor: theme.Colors.alternative,
      borderRadius: theme.MetricsSizes.small,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      flex: 1,
    },
    lineThrough: {
      textDecorationLine: 'line-through',
    },
    checkbox: {
      borderWidth: 2,
    },
    rightSection: {
      position: 'absolute',
      zIndex: -1,
      right: 0,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.MetricsSizes.regular,
    },
  });

export default TodoItem;
