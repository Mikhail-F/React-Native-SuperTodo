import React from 'react'
import {HeaderButton} from "react-navigation-header-buttons";
import {AntDesign} from "@expo/vector-icons";

const AppHeaderIcon = (props) =>{
    return (
        <HeaderButton
            size={27}
            IconComponent={AntDesign}
            color={'black'}
            {...props}
        />
    )
}

export default AppHeaderIcon