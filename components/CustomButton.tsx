import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, FlatListComponent } from 'react-native';
import { StylesOrDefault } from 'react-native-reanimated';

interface CustomButtonProps {
    /** Type of style to be applied */
    styleType: 'primary' | 'danger';
    /** The content to be displayed inside the button */
    children: React.ReactNode;
    /** Callback function invoked when the button is clicked */
    onClick: () => void;
}

/**
 * CustomButton component for rendering a styled button with various styles and states.
 * 
 * @param children - The content to be displayed inside the button 
 * @param styleType - Defines the button style. Accepts values like 'primary'
 * @param onClick - Callback function invoked when the button is clicked
 * 
 * @returns A styled button component with custom styles and behaviors
 */
const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    styleType,
    onClick,
}) => {
    const buttonStyles = [
        styles.button,
        styleType === 'primary' && styles.primary,
        styleType === 'danger' && styles.danger,
    ];

    return (
        <TouchableOpacity style={buttonStyles} onPress={onClick}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        height: 40,
        marginBottom: 16,
    },
    primary: {
        backgroundColor: '#1d74ad', //Blue
    },
    danger: {
        backgroundColor: '#d9534f', // Red
    },
    text: {
        color: '#ffffff', //white
        fontSize: 16,
        fontWeight: 'bold',
    }
})
export default CustomButton;


