import React from 'react';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        {
            props.isauthProp ? <NavigationItem link="/orders" >Orders</NavigationItem> : null
        }
        {
            !props.isauthProp ? <NavigationItem link="/auth" >Sign up</NavigationItem> :
                <NavigationItem link="/logout" >Logout</NavigationItem>
        }
    </ul>

)

export default navigationItems;