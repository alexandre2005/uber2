import { Platform, PixelRatio } from "react-native";

export default function getPixelSize(layoutSize) {
    return Platform.select({
        ios: layoutSize,
        android: PixelRatio.roundToNearestPixel(layoutSize)
    });
}
