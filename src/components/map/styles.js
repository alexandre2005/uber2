import styled, {css} from 'styled-components/native';
import { Platform } from 'react-native';

export const Back = styled.TouchableOpacity`
    position: absolute;
    top: ${Platform.select({ ios: 60, android: 40})};
    left: 20px;
`;

export const LocationBox = styled.View`
    background: #fff;
    shadow-color: #000;
    shadowOffset: { width: 0; height: 0 };
    shadow-opacity: 0.1;
    border: 1px solid #ddd;
    border-radius: 3px;
    flex-direction: row;

    ${Platform.select({
        ios: css``,
        android: css``
    })}

`;

export const LocationText = styled.Text`
    margin: 8px 10px;
    font-size: 14px;
    color: #333;
`;

export const LocationTimeBox = styled.View`
    background: #222;
    padding: 3px 8px;
`;

export const LocationTimeText = styled.Text`
    color: #fff;
    font-size: 12px;
    text-align: center;
`;

export const LocationTimeTextSmall = styled.Text`
    color: #fff;
    font-size: 10px;
    text-align: center;
`;